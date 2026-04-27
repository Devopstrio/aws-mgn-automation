# Devopstrio AWS MGN Automation
# Core Migration Infrastructure (Terraform)
# Target: AWS

terraform {
  required_version = ">= 1.5.0"
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.40"
    }
  }
}

provider "aws" {
  region = "eu-west-1"
}

# 1. Migration Factory Orchestration Resource Group
resource "aws_resourcegroups_group" "migration_factory" {
  name = "rg-aws-mgn-automation-prd"
  resource_query {
    query = jsonencode({
      ResourceTypeFilters = ["AWS::AllSupported"]
      TagFilters = [
        {
          Key    = "Platform"
          Values = ["MGN-Automation"]
        }
      ]
    })
  }
}

# 2. Migration Control Plane VPC
resource "aws_vpc" "migration_vpc" {
  cidr_block           = "10.50.0.0/16"
  enable_dns_hostnames = true
  enable_dns_support   = true
  tags = {
    Name     = "vpc-mgn-orchestrator-prd"
    Platform = "MGN-Automation"
  }
}

# 3. AWS MGN Default Replication Configuration (Example placeholder, as MGN is Service-Linked)
# Note: Most MGN config is managed via the MGN API / Console, but we define landing zone support.

# 4. PostgreSQL for Migration Metadata
resource "aws_db_instance" "migration_db" {
  identifier           = "db-mgn-metadata-prd"
  engine               = "postgres"
  engine_version       = "15"
  instance_class       = "db.t3.medium"
  allocated_storage    = 50
  username             = "migrator_admin"
  password             = "secure-password-from-sm"
  db_subnet_group_name = aws_db_subnet_group.migration_subnets.name
  skip_final_snapshot  = true
}

resource "aws_db_subnet_group" "migration_subnets" {
  name       = "sng-mgn-automation"
  subnet_ids = [aws_subnet.private_1.id, aws_subnet.private_2.id]
}

# 5. IAM Policy for Migration Automation (Service Role)
resource "aws_iam_role" "mgn_orchestrator" {
  name = "role-mgn-automation-orchestrator"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = "sts:AssumeRole"
        Effect = "Allow"
        Principal = {
          Service = "ec2.amazonaws.com"
        }
      }
    ]
  })
}

resource "aws_iam_role_policy_attachment" "mgn_full_access" {
  role       = aws_iam_role.mgn_orchestrator.name
  policy_arn = "arn:aws:iam::aws:policy/AWSApplicationMigrationFullAccess"
}

# 6. S3 Bucket for Migration Log Exports & Runbooks
resource "aws_s3_bucket" "migration_logs" {
  bucket = "devopstrio-mgn-migration-artifacts"
}

# Outputs
output "vpc_id" {
  value = aws_vpc.migration_vpc.id
}

output "db_endpoint" {
  value = aws_db_instance.migration_db.endpoint
}
