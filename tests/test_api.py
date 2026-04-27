import pytest
from fastapi.testclient import TestClient
from backend.src.main import app

# Devopstrio AWS MGN Automation
# Integration Tests for Migration Factory & Wave Orchestration

client = TestClient(app)

def test_health_check_operational():
    """Verify that the migration gateway is healthy and MGN is connected."""
    response = client.get("/health")
    assert response.status_code == 200
    assert response.json()["mgn_connected"] is True

def test_migration_inventory_retrieval():
    """Ensure the platform can list migration candidates with replication status."""
    response = client.get("/servers")
    assert response.status_code == 200
    assert len(response.json()) > 0
    assert "app-prod-01" in [s["hostname"] for s in response.json()]

def test_wave_creation_workflow():
    """Verify that a new migration wave can be correctly initialized."""
    payload = {
        "name": "Phase 1 - SAP Hub",
        "target_date": "2026-06-15T10:00:00Z",
        "description": "Critical SAP workloads migration"
    }
    response = client.post("/waves/create", json=payload)
    assert response.status_code == 201
    assert "id" in response.json()
    assert response.json()["name"] == "Phase 1 - SAP Hub"

def test_cutover_initiation():
    """Verify the initiation of an automated cutover for a migration wave."""
    payload = {
        "wave_id": "w-01",
        "force_restart": True
    }
    response = client.post("/cutover/execute", json=payload)
    assert response.status_code == 202
    assert "job_id" in response.json()

def test_migration_analytics_summary():
    """Ensure the platform reports migration velocity and risk metrics."""
    response = client.get("/analytics/summary")
    assert response.status_code == 200
    assert "migration_velocity" in response.json()
    assert "ready_for_cutover" in response.json()

def test_risk_register_reporting():
    """Verify the platform provides an active migration risk register."""
    response = client.get("/risks")
    assert response.status_code == 200
    assert any(r["severity"] == "High" for r in response.json())
