-- Create users table
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[users]') AND type in (N'U'))
BEGIN
    CREATE TABLE [users] (
        [id] BIGINT IDENTITY(1,1) PRIMARY KEY,
        [username] VARCHAR(50) NOT NULL,
        [first_name] VARCHAR(100) NOT NULL,
        [last_name] VARCHAR(100) NOT NULL,
        [email] VARCHAR(100) NOT NULL,
        [password_hash] VARCHAR(255) NOT NULL,
        [created_at] DATETIME2 NOT NULL DEFAULT GETDATE(),
        [updated_at] DATETIME2 NOT NULL DEFAULT GETDATE(),
        [is_active] BIT NOT NULL DEFAULT 0,
        [account_non_locked] BIT NOT NULL DEFAULT 1,
        [failed_attempt] INT NOT NULL DEFAULT 0,
        [lock_time] DATETIME2 NULL,
        [last_password_change_date] DATETIME2 NULL,
        [is_deleted] BIT NOT NULL DEFAULT 0
    )
END
GO

-- Add unique constraints
IF NOT EXISTS (SELECT * FROM sys.indexes WHERE name = 'UQ_users_username' AND object_id = OBJECT_ID('users'))
    ALTER TABLE [users] ADD CONSTRAINT UQ_users_username UNIQUE (username)
GO

IF NOT EXISTS (SELECT * FROM sys.indexes WHERE name = 'UQ_users_email' AND object_id = OBJECT_ID('users'))
    ALTER TABLE [users] ADD CONSTRAINT UQ_users_email UNIQUE (email)
GO

-- Create trigger for updated_at
IF EXISTS (SELECT * FROM sys.triggers WHERE name = 'trg_users_update')
    DROP TRIGGER [trg_users_update]
GO

CREATE TRIGGER [trg_users_update]
ON [users]
AFTER UPDATE
AS
BEGIN
    SET NOCOUNT ON;
    IF (UPDATE(username) OR UPDATE(first_name) OR UPDATE(last_name) OR 
        UPDATE(email) OR UPDATE(password_hash) OR UPDATE(is_active) OR 
        UPDATE(account_non_locked) OR UPDATE(failed_attempt) OR UPDATE(lock_time) OR 
        UPDATE(last_password_change_date) OR UPDATE(is_deleted))
    BEGIN
        UPDATE [users]
        SET [updated_at] = GETDATE()
        FROM [users] u
        INNER JOIN inserted i ON u.id = i.id
    END
END
GO

-- Create indexes if they don't exist
IF NOT EXISTS (SELECT * FROM sys.indexes WHERE name = 'idx_user_username' AND object_id = OBJECT_ID('users'))
    CREATE INDEX [idx_user_username] ON [users]([username])
GO

IF NOT EXISTS (SELECT * FROM sys.indexes WHERE name = 'idx_user_email' AND object_id = OBJECT_ID('users'))
    CREATE INDEX [idx_user_email] ON [users]([email])
GO

-- Create roles table
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[roles]') AND type in (N'U'))
BEGIN
    CREATE TABLE [roles] (
        [id] BIGINT IDENTITY(1,1) PRIMARY KEY,
        [name] VARCHAR(50) NOT NULL,
        [description] VARCHAR(255) NULL
    )
END
GO

-- Add unique constraint to roles.name
IF NOT EXISTS (SELECT * FROM sys.indexes WHERE name = 'UQ_roles_name' AND object_id = OBJECT_ID('roles'))
    ALTER TABLE [roles] ADD CONSTRAINT UQ_roles_name UNIQUE (name)
GO

-- Create user_roles join table
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[user_roles]') AND type in (N'U'))
BEGIN
    CREATE TABLE [user_roles] (
        [user_id] BIGINT NOT NULL,
        [role_id] BIGINT NOT NULL,
        CONSTRAINT [PK_user_roles] PRIMARY KEY ([user_id], [role_id]),
        CONSTRAINT [FK_user_roles_user_id] FOREIGN KEY ([user_id]) REFERENCES [users]([id]) ON DELETE CASCADE,
        CONSTRAINT [FK_user_roles_role_id] FOREIGN KEY ([role_id]) REFERENCES [roles]([id]) ON DELETE CASCADE
    )
END
GO

-- Create password history table
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[password_history]') AND type in (N'U'))
BEGIN
    CREATE TABLE [password_history] (
        [id] BIGINT IDENTITY(1,1) PRIMARY KEY,
        [user_id] BIGINT NOT NULL,
        [password_hash] VARCHAR(255) NOT NULL,
        [created_at] DATETIME2 NOT NULL DEFAULT GETDATE(),
        CONSTRAINT [FK_password_history_user_id] FOREIGN KEY ([user_id]) REFERENCES [users]([id]) ON DELETE CASCADE
    )
END
GO

-- Create refresh tokens table
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[refresh_tokens]') AND type in (N'U'))
BEGIN
    CREATE TABLE [refresh_tokens] (
        [id] BIGINT IDENTITY(1,1) PRIMARY KEY,
        [token] VARCHAR(255) NOT NULL,
        [user_id] BIGINT NOT NULL,
        [expiry_date] DATETIME2 NOT NULL,
        [revoked] BIT NOT NULL DEFAULT 0,
        CONSTRAINT [FK_refresh_tokens_user_id] FOREIGN KEY ([user_id]) REFERENCES [users]([id]) ON DELETE CASCADE
    )
END
GO

-- Add unique constraint to refresh_tokens.token
IF NOT EXISTS (SELECT * FROM sys.indexes WHERE name = 'UQ_refresh_tokens_token' AND object_id = OBJECT_ID('refresh_tokens'))
    ALTER TABLE [refresh_tokens] ADD CONSTRAINT UQ_refresh_tokens_token UNIQUE (token)
GO

-- Create user login history table
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[user_login_history]') AND type in (N'U'))
BEGIN
    CREATE TABLE [user_login_history] (
        [id] BIGINT IDENTITY(1,1) PRIMARY KEY,
        [user_id] BIGINT NOT NULL,
        [ip_address] VARCHAR(45) NULL,
        [user_agent] VARCHAR(255) NULL,
        [login_time] DATETIME2 NOT NULL DEFAULT GETDATE(),
        [logout_time] DATETIME2 NULL,
        [successful] BIT NOT NULL DEFAULT 0,
        [error_message] VARCHAR(255) NULL,
        CONSTRAINT [FK_user_login_history_user_id] FOREIGN KEY ([user_id]) REFERENCES [users]([id]) ON DELETE CASCADE
    )
END
GO

-- Insert default roles if they don't exist
IF NOT EXISTS (SELECT 1 FROM [roles] WHERE [name] = 'ROLE_USER')
    INSERT INTO [roles] ([name], [description]) VALUES ('ROLE_USER', 'Standard user with basic permissions')
GO

IF NOT EXISTS (SELECT 1 FROM [roles] WHERE [name] = 'ROLE_ADMIN')
    INSERT INTO [roles] ([name], [description]) VALUES ('ROLE_ADMIN', 'Administrator with full system access')
GO

IF NOT EXISTS (SELECT 1 FROM [roles] WHERE [name] = 'ROLE_MANAGER')
    INSERT INTO [roles] ([name], [description]) VALUES ('ROLE_MANAGER', 'Manager with department-level access')
GO

-- Insert admin user if not exists
IF NOT EXISTS (SELECT 1 FROM [users] WHERE [username] = 'admin')
BEGIN
    INSERT INTO [users] ([username], [first_name], [last_name], [email], [password_hash], [is_active], [account_non_locked], [last_password_change_date])
    VALUES ('admin', 'System', 'Administrator', 'admin@example.com', 
           '$2a$12$OGP/3aAvVyZDfAPG8Kc7POfqtRygm7lEtEzKBJouQXsTy17Y4JMPq', -- 'password123' hashed with BCrypt
           1, 1, GETDATE())
END
GO

-- Assign admin role to admin user
IF NOT EXISTS (
    SELECT 1 FROM [user_roles] ur
    JOIN [users] u ON ur.user_id = u.id
    JOIN [roles] r ON ur.role_id = r.id
    WHERE u.username = 'admin' AND r.name = 'ROLE_ADMIN'
)
BEGIN
    INSERT INTO [user_roles] ([user_id], [role_id])
    SELECT u.id, r.id 
    FROM [users] u, [roles] r
    WHERE u.username = 'admin' AND r.name = 'ROLE_ADMIN'
END
GO