#!/bin/bash
# Quick API Testing Script for PolisPraxis

echo "🧪 PolisPraxis API Testing"
echo "=========================="
echo ""
echo "⚠️  Make sure server is running: npm run dev"
echo ""

# Test 1: Get all projects
echo "📊 Test 1: GET all projects"
echo "curl http://localhost:3000/api/projects"
curl -s http://localhost:3000/api/projects | python3 -m json.tool || curl -s http://localhost:3000/api/projects
echo ""
echo ""

# Test 2: Get projects by status
echo "📊 Test 2: GET projects filtered by status"
echo "curl http://localhost:3000/api/projects?status=active"
curl -s "http://localhost:3000/api/projects?status=active" | python3 -m json.tool || curl -s "http://localhost:3000/api/projects?status=active"
echo ""
echo ""

# Test 3: Create new project
echo "✨ Test 3: POST create new project"
echo "curl -X POST http://localhost:3000/api/projects"
curl -s -X POST http://localhost:3000/api/projects \
  -H "Content-Type: application/json" \
  -d '{"title":"Community Garden","description":"Create a community garden in Exarchia","category":"environment","budget":5000}' | python3 -m json.tool || \
curl -s -X POST http://localhost:3000/api/projects \
  -H "Content-Type: application/json" \
  -d '{"title":"Community Garden","description":"Create a community garden in Exarchia","category":"environment","budget":5000}'
echo ""
echo ""

# Test 4: Get all pledges
echo "💰 Test 4: GET all pledges"
echo "curl http://localhost:3000/api/pledges"
curl -s http://localhost:3000/api/pledges | python3 -m json.tool || curl -s http://localhost:3000/api/pledges
echo ""
echo ""

# Test 5: Get pledges for project 1
echo "💰 Test 5: GET pledges for project 1"
echo "curl http://localhost:3000/api/pledges?projectId=1"
curl -s "http://localhost:3000/api/pledges?projectId=1" | python3 -m json.tool || curl -s "http://localhost:3000/api/pledges?projectId=1"
echo ""
echo ""

# Test 6: Create money pledge
echo "💵 Test 6: POST create money pledge"
echo "curl -X POST http://localhost:3000/api/pledges"
curl -s -X POST http://localhost:3000/api/pledges \
  -H "Content-Type: application/json" \
  -d '{"project_id":"1","type":"money","amount":100}' | python3 -m json.tool || \
curl -s -X POST http://localhost:3000/api/pledges \
  -H "Content-Type: application/json" \
  -d '{"project_id":"1","type":"money","amount":100}'
echo ""
echo ""

# Test 7: Create time pledge
echo "⏰ Test 7: POST create time pledge"
echo "curl -X POST http://localhost:3000/api/pledges"
curl -s -X POST http://localhost:3000/api/pledges \
  -H "Content-Type: application/json" \
  -d '{"project_id":"1","type":"time","hours":5}' | python3 -m json.tool || \
curl -s -X POST http://localhost:3000/api/pledges \
  -H "Content-Type: application/json" \
  -d '{"project_id":"1","type":"time","hours":5}'
echo ""
echo ""

# Test 8: Create materials pledge
echo "🛠️  Test 8: POST create materials pledge"
echo "curl -X POST http://localhost:3000/api/pledges"
curl -s -X POST http://localhost:3000/api/pledges \
  -H "Content-Type: application/json" \
  -d '{"project_id":"1","type":"materials","description":"Paint and brushes"}' | python3 -m json.tool || \
curl -s -X POST http://localhost:3000/api/pledges \
  -H "Content-Type: application/json" \
  -d '{"project_id":"1","type":"materials","description":"Paint and brushes"}'
echo ""
echo ""

# Test 9: Get stats for project 1
echo "📈 Test 9: GET stats for project 1"
echo "curl http://localhost:3000/api/pledges/stats?projectId=1"
curl -s "http://localhost:3000/api/pledges/stats?projectId=1" | python3 -m json.tool || curl -s "http://localhost:3000/api/pledges/stats?projectId=1"
echo ""
echo ""

echo "=========================="
echo "✅ All tests completed!"
echo "=========================="
echo ""
echo "🌐 Visual testing:"
echo "   http://localhost:3000/test"
echo ""
