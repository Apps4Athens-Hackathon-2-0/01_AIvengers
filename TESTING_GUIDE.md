# 🧪 PolisPraxis Testing Guide

## Quick Start: 3 Ways to Test

### 1. 🖱️ ONE-CLICK TESTING (Easiest - Mac Users)

Just double-click these files:
1. **`RUN_ME.command`** - Starts the development server
2. **`TEST_API.command`** - Runs all API tests automatically

### 2. 🌐 BROWSER TESTING (Visual Interface)

1. Start the server:
   ```bash
   npm run dev
   ```

2. Open your browser and visit:
   - **Main Test Page**: http://localhost:3000/test
   - **Home Page**: http://localhost:3000

3. **What you can test on the test page:**
   - ✅ Create pledges (money, time, materials)
   - ✅ View pledge statistics
   - ✅ See all pledges list
   - ✅ Filter pledges by project
   - ✅ Real-time UI updates

### 3. 🔧 COMMAND LINE TESTING (For Developers)

**Option A: Run the automated test script**
```bash
chmod +x test-all.sh
./test-all.sh
```

**Option B: Manual cURL commands** (see below)

---

## 📊 API Endpoints to Test

### 1️⃣ **Projects API**

#### Get All Projects
```bash
curl http://localhost:3000/api/projects
```

#### Filter Projects by Status
```bash
# Get only active projects
curl "http://localhost:3000/api/projects?status=active"

# Get pending projects
curl "http://localhost:3000/api/projects?status=pending"

# Get completed projects
curl "http://localhost:3000/api/projects?status=completed"
```

#### Filter Projects by Category
```bash
# Infrastructure projects
curl "http://localhost:3000/api/projects?category=infrastructure"

# Environment projects
curl "http://localhost:3000/api/projects?category=environment"

# Community projects
curl "http://localhost:3000/api/projects?category=community"
```

#### Create a New Project
```bash
curl -X POST http://localhost:3000/api/projects \
  -H "Content-Type: application/json" \
  -d '{
    "title": "New Bike Lane on Main Street",
    "description": "Adding safe bike lanes for commuters",
    "category": "infrastructure",
    "location": "Main Street, Athens",
    "budget": 15000
  }'
```

---

### 2️⃣ **Pledges API** (WOW Factor! 🎉)

#### Get All Pledges
```bash
curl http://localhost:3000/api/pledges
```

#### Get Pledges for a Specific Project
```bash
# Pledges for Project 1 (Park Renovation)
curl "http://localhost:3000/api/pledges?projectId=1"

# Pledges for Project 2 (Community Garden)
curl "http://localhost:3000/api/pledges?projectId=2"

# Pledges for Project 3 (Street Art)
curl "http://localhost:3000/api/pledges?projectId=3"
```

#### Create a Money Pledge
```bash
curl -X POST http://localhost:3000/api/pledges \
  -H "Content-Type: application/json" \
  -d '{
    "project_id": "1",
    "type": "money",
    "amount": 100,
    "description": "Happy to support this project!"
  }'
```

#### Create a Time Pledge (Volunteer Hours)
```bash
curl -X POST http://localhost:3000/api/pledges \
  -H "Content-Type: application/json" \
  -d '{
    "project_id": "1",
    "type": "time",
    "hours": 8,
    "description": "I can help with painting on weekends"
  }'
```

#### Create a Materials Pledge
```bash
curl -X POST http://localhost:3000/api/pledges \
  -H "Content-Type: application/json" \
  -d '{
    "project_id": "2",
    "type": "materials",
    "description": "I have gardening tools and seeds to donate"
  }'
```

---

### 3️⃣ **Pledge Statistics API**

#### Get Stats for a Project
```bash
# Stats for Project 1 (Park Renovation)
curl "http://localhost:3000/api/pledges/stats?projectId=1"

# Stats for Project 2 (Community Garden)
curl "http://localhost:3000/api/pledges/stats?projectId=2"

# Stats for Project 3 (Street Art)
curl "http://localhost:3000/api/pledges/stats?projectId=3"
```

**Expected Response:**
```json
{
  "total_money": 250,
  "total_hours": 24,
  "total_materials": 2,
  "total_pledges": 4,
  "progress_percentage": 50,
  "breakdown": {
    "money": {
      "count": 1,
      "total_amount": 250
    },
    "time": {
      "count": 2,
      "total_hours": 24
    },
    "materials": {
      "count": 1
    }
  }
}
```

---

## 🔍 What to Check

### ✅ Success Indicators

1. **Server Starts Without Errors**
   - No TypeScript compilation errors
   - No missing module errors
   - Port 3000 is available

2. **API Responses**
   - Status code: 200 OK
   - Valid JSON format
   - Contains expected data fields

3. **Test Page Works**
   - Forms are visible
   - Buttons are clickable
   - Stats update after creating pledges
   - No console errors (press F12 in browser)

### ❌ Common Issues & Fixes

1. **Port Already in Use**
   ```bash
   # Kill the process using port 3000
   lsof -ti:3000 | xargs kill -9
   # Then restart the server
   npm run dev
   ```

2. **Module Not Found**
   ```bash
   # Reinstall dependencies
   rm -rf node_modules package-lock.json
   npm install
   ```

3. **API Returns 404**
   - Make sure server is running
   - Check the URL is correct (http://localhost:3000)
   - Verify the endpoint path (e.g., `/api/pledges`)

---

## 🎯 Testing Checklist

### Basic Tests (Must Pass)
- [ ] Server starts successfully with `npm run dev`
- [ ] Test page loads at http://localhost:3000/test
- [ ] GET `/api/projects` returns 3 mock projects
- [ ] GET `/api/pledges` returns 4 mock pledges
- [ ] GET `/api/pledges/stats?projectId=1` returns statistics

### Pledge System Tests (WOW Factor)
- [ ] Create a money pledge with amount
- [ ] Create a time pledge with hours
- [ ] Create a materials pledge with description
- [ ] View updated statistics after creating pledge
- [ ] Filter pledges by project ID

### Integration Tests
- [ ] Create project → Create pledge for that project → See stats
- [ ] Multiple pledges for same project show correct totals
- [ ] Progress percentage calculates correctly

---

## 📸 Expected Results

### Mock Data Available

**3 Projects:**
1. **Central Park Renovation** (€5,000 budget)
2. **Community Garden Initiative** (€3,000 budget)
3. **Street Art Project** (€2,000 budget)

**4 Pledges:**
1. €250 money pledge (Project 1)
2. 16 hours volunteer time (Project 1)
3. Materials donation (Project 2)
4. 8 hours volunteer time (Project 2)

---

## 🚀 Next Steps After Testing

1. **Database Integration**
   - Run the SQL file in Supabase Dashboard
   - Replace mock data with real database queries

2. **Authentication Testing**
   - Test user signup/login
   - Verify session persistence

3. **Municipality Features**
   - Test project approval workflow
   - Check dashboard statistics

---

## 💡 Tips

- **Use the browser test page first** - it's the easiest way to verify everything works
- **Check browser console** (F12) for any JavaScript errors
- **Use `test-all.sh`** for comprehensive automated testing
- **Keep the server running** while you test different endpoints
- **Test incrementally** - if one endpoint fails, fix it before moving on

---

## 🆘 Need Help?

If something doesn't work:
1. Check the terminal for error messages
2. Open browser console (F12) for frontend errors
3. Verify the server is running on port 3000
4. Make sure you're in the correct directory
5. Try restarting the server

**Happy Testing! 🎉**
