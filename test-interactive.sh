#!/bin/bash

# PolisPraxis API Testing Script
# Color codes for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${BLUE}╔══════════════════════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║       🧪 PolisPraxis API Interactive Tester 🧪          ║${NC}"
echo -e "${BLUE}╚══════════════════════════════════════════════════════════╝${NC}"
echo ""

BASE_URL="http://localhost:3000"

# Function to print section headers
print_section() {
    echo ""
    echo -e "${YELLOW}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo -e "${GREEN}$1${NC}"
    echo -e "${YELLOW}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
}

# Function to test endpoint
test_endpoint() {
    local method=$1
    local endpoint=$2
    local data=$3
    local description=$4
    
    echo -e "${BLUE}▶ Testing:${NC} $description"
    echo -e "${BLUE}  Endpoint:${NC} $method $endpoint"
    
    if [ "$method" = "GET" ]; then
        response=$(curl -s -w "\n%{http_code}" "$BASE_URL$endpoint")
    else
        echo -e "${BLUE}  Data:${NC} $data"
        response=$(curl -s -w "\n%{http_code}" -X "$method" "$BASE_URL$endpoint" \
            -H "Content-Type: application/json" \
            -d "$data")
    fi
    
    http_code=$(echo "$response" | tail -n1)
    body=$(echo "$response" | sed '$d')
    
    if [ "$http_code" = "200" ]; then
        echo -e "${GREEN}✓ SUCCESS${NC} (HTTP $http_code)"
        echo "$body" | python3 -m json.tool 2>/dev/null || echo "$body"
    else
        echo -e "${RED}✗ FAILED${NC} (HTTP $http_code)"
        echo "$body"
    fi
    echo ""
}

# Check if server is running
echo -e "${BLUE}Checking if server is running...${NC}"
if ! curl -s "$BASE_URL" > /dev/null; then
    echo -e "${RED}✗ Server is not running on $BASE_URL${NC}"
    echo -e "${YELLOW}Please start the server first with: npm run dev${NC}"
    echo -e "${YELLOW}Or double-click: RUN_ME.command${NC}"
    exit 1
fi
echo -e "${GREEN}✓ Server is running!${NC}"

# Main menu
while true; do
    echo ""
    echo -e "${BLUE}╔════════════════════════════════════════════════╗${NC}"
    echo -e "${BLUE}║           What would you like to test?        ║${NC}"
    echo -e "${BLUE}╠════════════════════════════════════════════════╣${NC}"
    echo -e "${BLUE}║  ${NC}1${BLUE}) 📋 Test ALL Endpoints (Comprehensive)    ║${NC}"
    echo -e "${BLUE}║  ${NC}2${BLUE}) 🏗️  Test Projects API                     ║${NC}"
    echo -e "${BLUE}║  ${NC}3${BLUE}) 🎯 Test Pledges API (WOW Factor!)        ║${NC}"
    echo -e "${BLUE}║  ${NC}4${BLUE}) 📊 Test Pledge Statistics                ║${NC}"
    echo -e "${BLUE}║  ${NC}5${BLUE}) ➕ Create Custom Pledge                   ║${NC}"
    echo -e "${BLUE}║  ${NC}6${BLUE}) 🌐 Open Test Page in Browser             ║${NC}"
    echo -e "${BLUE}║  ${NC}0${BLUE}) 🚪 Exit                                   ║${NC}"
    echo -e "${BLUE}╚════════════════════════════════════════════════╝${NC}"
    echo ""
    echo -n "Enter your choice [0-6]: "
    read choice

    case $choice in
        1)
            print_section "🚀 Running Comprehensive Test Suite"
            
            print_section "1️⃣  PROJECTS API"
            test_endpoint "GET" "/api/projects" "" "Get all projects"
            test_endpoint "GET" "/api/projects?status=active" "" "Get active projects"
            test_endpoint "GET" "/api/projects?category=infrastructure" "" "Get infrastructure projects"
            test_endpoint "POST" "/api/projects" \
                '{"title":"Test Project","description":"Testing API","category":"community","location":"Athens","budget":1000}' \
                "Create new project"
            
            print_section "2️⃣  PLEDGES API"
            test_endpoint "GET" "/api/pledges" "" "Get all pledges"
            test_endpoint "GET" "/api/pledges?projectId=1" "" "Get pledges for project 1"
            test_endpoint "POST" "/api/pledges" \
                '{"project_id":"1","type":"money","amount":50,"description":"Test pledge"}' \
                "Create money pledge"
            test_endpoint "POST" "/api/pledges" \
                '{"project_id":"1","type":"time","hours":5,"description":"Test volunteer pledge"}' \
                "Create time pledge"
            test_endpoint "POST" "/api/pledges" \
                '{"project_id":"2","type":"materials","description":"Test materials pledge"}' \
                "Create materials pledge"
            
            print_section "3️⃣  STATISTICS API"
            test_endpoint "GET" "/api/pledges/stats?projectId=1" "" "Get stats for project 1"
            test_endpoint "GET" "/api/pledges/stats?projectId=2" "" "Get stats for project 2"
            
            echo -e "${GREEN}✅ Comprehensive test completed!${NC}"
            ;;
            
        2)
            print_section "🏗️  TESTING PROJECTS API"
            test_endpoint "GET" "/api/projects" "" "Get all projects"
            test_endpoint "GET" "/api/projects?status=active" "" "Filter by status: active"
            test_endpoint "GET" "/api/projects?category=environment" "" "Filter by category: environment"
            test_endpoint "POST" "/api/projects" \
                '{"title":"My Test Project","description":"A test project","category":"community","location":"Athens Center","budget":5000}' \
                "Create a new project"
            ;;
            
        3)
            print_section "🎯 TESTING PLEDGES API (WOW Factor!)"
            test_endpoint "GET" "/api/pledges" "" "Get all pledges"
            test_endpoint "GET" "/api/pledges?projectId=1" "" "Get pledges for Park Renovation"
            test_endpoint "GET" "/api/pledges?projectId=2" "" "Get pledges for Community Garden"
            echo ""
            echo -e "${YELLOW}Creating test pledges...${NC}"
            test_endpoint "POST" "/api/pledges" \
                '{"project_id":"1","type":"money","amount":100,"description":"Supporting the park!"}' \
                "Money pledge (€100)"
            test_endpoint "POST" "/api/pledges" \
                '{"project_id":"1","type":"time","hours":8,"description":"Weekend volunteer"}' \
                "Time pledge (8 hours)"
            test_endpoint "POST" "/api/pledges" \
                '{"project_id":"2","type":"materials","description":"Gardening tools"}' \
                "Materials pledge"
            ;;
            
        4)
            print_section "📊 TESTING PLEDGE STATISTICS"
            test_endpoint "GET" "/api/pledges/stats?projectId=1" "" "Stats for Central Park Renovation"
            test_endpoint "GET" "/api/pledges/stats?projectId=2" "" "Stats for Community Garden"
            test_endpoint "GET" "/api/pledges/stats?projectId=3" "" "Stats for Street Art Project"
            ;;
            
        5)
            print_section "➕ CREATE CUSTOM PLEDGE"
            echo ""
            echo "Enter pledge details:"
            echo -n "Project ID (1, 2, or 3): "
            read project_id
            echo -n "Type (money/time/materials): "
            read pledge_type
            
            if [ "$pledge_type" = "money" ]; then
                echo -n "Amount in EUR: "
                read amount
                echo -n "Description: "
                read description
                test_endpoint "POST" "/api/pledges" \
                    "{\"project_id\":\"$project_id\",\"type\":\"money\",\"amount\":$amount,\"description\":\"$description\"}" \
                    "Your custom money pledge"
            elif [ "$pledge_type" = "time" ]; then
                echo -n "Hours: "
                read hours
                echo -n "Description: "
                read description
                test_endpoint "POST" "/api/pledges" \
                    "{\"project_id\":\"$project_id\",\"type\":\"time\",\"hours\":$hours,\"description\":\"$description\"}" \
                    "Your custom time pledge"
            elif [ "$pledge_type" = "materials" ]; then
                echo -n "Description: "
                read description
                test_endpoint "POST" "/api/pledges" \
                    "{\"project_id\":\"$project_id\",\"type\":\"materials\",\"description\":\"$description\"}" \
                    "Your custom materials pledge"
            else
                echo -e "${RED}Invalid pledge type!${NC}"
            fi
            ;;
            
        6)
            print_section "🌐 OPENING TEST PAGE"
            echo -e "${GREEN}Opening http://localhost:3000/test in your browser...${NC}"
            if [[ "$OSTYPE" == "darwin"* ]]; then
                open "http://localhost:3000/test"
            elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
                xdg-open "http://localhost:3000/test"
            else
                echo "Please manually open: http://localhost:3000/test"
            fi
            echo -e "${BLUE}You can now test the pledge system visually!${NC}"
            ;;
            
        0)
            echo -e "${GREEN}Thanks for testing! Goodbye! 👋${NC}"
            exit 0
            ;;
            
        *)
            echo -e "${RED}Invalid choice. Please enter a number between 0 and 6.${NC}"
            ;;
    esac
    
    echo ""
    echo -n "Press Enter to continue..."
    read
done
