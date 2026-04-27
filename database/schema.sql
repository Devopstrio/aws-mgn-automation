-- Devopstrio AWS MGN Automation
-- Core Migration Factory & Orchestration Database Schema
-- Target: PostgreSQL 15+

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Identity & Tenancy
CREATE TABLE IF NOT EXISTS tenants (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    aws_account_id VARCHAR(50) UNIQUE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tenant_id UUID REFERENCES tenants(id),
    email VARCHAR(255) UNIQUE NOT NULL,
    display_name VARCHAR(255),
    role VARCHAR(50) DEFAULT 'MigrationEngineer', -- ProgramManager, MigrationEngineer, Auditor
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. Infrastructure Inventory & Discovery
CREATE TABLE IF NOT EXISTS applications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tenant_id UUID REFERENCES tenants(id),
    name VARCHAR(255) NOT NULL,
    criticality VARCHAR(50) DEFAULT 'Medium', -- Tier1, Tier2, Tier3
    owner_email VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS servers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    application_id UUID REFERENCES applications(id),
    hostname VARCHAR(255) NOT NULL,
    ip_address VARCHAR(50),
    os_type VARCHAR(100), -- Windows 2019, RHEL 8, etc.
    mgn_agent_id VARCHAR(255) UNIQUE,
    replication_status VARCHAR(50) DEFAULT 'NotStarted', -- Replicating, Healthy, Lagging, Disconnected
    readiness_score INT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS dependencies (
    id BIGSERIAL PRIMARY KEY,
    source_server_id UUID REFERENCES servers(id) ON DELETE CASCADE,
    target_server_id UUID REFERENCES servers(id) ON DELETE CASCADE,
    port INT,
    protocol VARCHAR(20),
    discovery_source VARCHAR(50) DEFAULT 'Agentless'
);

-- 3. Wave Planning
CREATE TABLE IF NOT EXISTS waves (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tenant_id UUID REFERENCES tenants(id),
    name VARCHAR(255) NOT NULL,
    target_cutover_date TIMESTAMP WITH TIME ZONE,
    status VARCHAR(50) DEFAULT 'Planning', -- Scoping, Replication, Readiness, Completed
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE servers ADD COLUMN wave_id UUID REFERENCES waves(id);

-- 4. Replication & Cutover Ledger
CREATE TABLE IF NOT EXISTS replications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    server_id UUID REFERENCES servers(id),
    mgn_job_id VARCHAR(255),
    start_time TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    completion_time TIMESTAMP WITH TIME ZONE,
    data_migrated_gb FLOAT DEFAULT 0.0
);

CREATE TABLE IF NOT EXISTS cutovers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    wave_id UUID REFERENCES waves(id),
    started_by UUID REFERENCES users(id),
    status VARCHAR(50) DEFAULT 'InProgress', -- Success, Failed, RolledBack
    log_output TEXT,
    started_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    finished_at TIMESTAMP WITH TIME ZONE
);

-- 5. Risk & Analytics
CREATE TABLE IF NOT EXISTS risks (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tenant_id UUID REFERENCES tenants(id),
    severity VARCHAR(20) NOT NULL, -- Critical, High, Medium, Low
    category VARCHAR(100), -- Technical, Business, Resource
    description TEXT,
    status VARCHAR(20) DEFAULT 'Open',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS metrics (
    id BIGSERIAL PRIMARY KEY,
    metric_name VARCHAR(100) NOT NULL, -- Migration_Throughput_Servers, Average_Lag_Minutes, Cutover_Success_Rate
    value FLOAT NOT NULL,
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS audit_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id),
    action VARCHAR(255) NOT NULL,
    resource_id VARCHAR(255),
    payload JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Strategic Migration Indexes
CREATE INDEX idx_server_app ON servers(application_id);
CREATE INDEX idx_server_wave ON servers(wave_id);
CREATE INDEX idx_server_status ON servers(replication_status);
CREATE INDEX idx_wave_tenant ON waves(tenant_id);
CREATE INDEX idx_risk_tenant ON risks(tenant_id);
CREATE INDEX idx_metric_time ON metrics(timestamp);
