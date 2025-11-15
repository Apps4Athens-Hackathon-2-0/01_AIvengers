# 🚀 Quick Start - Testing Your PolisPraxis Backend

## ✅ You Have 4 Easy Ways to Test!

### 🥇 EASIEST: Visual HTML Tester (Recommended!)

1. **Start the server:**
   - Double-click: `RUN_ME.command`
   - OR run in terminal: `npm run dev`

2. **Open the tester:**
   - Double-click: `api-tester.html`
   - OR open in browser: `file:///Users/sotirioslympakis/Desktop/helpmeanytime/api-tester.html`

3. **Click buttons to test!**
   - All tests are visual with colored results
   - Create pledges with forms
   - See JSON responses instantly
   - No terminal needed!

---

### 🥈 INTERACTIVE: Terminal Menu (Also Great!)

1. **Start the server:**
   ```bash
   npm run dev
   ```

2. **Run the interactive tester:**
   - Double-click: `TEST_INTERACTIVE.command`
   - OR run in terminal: `./test-interactive.sh`

3. **Choose from menu:**
   - Test all endpoints at once
   - Test specific features
   - Create custom pledges interactively
   - Open browser test page

---

### 🥉 REACT PAGE: Built-in Test Interface

1. **Start the server:**
   ```bash
   npm run dev
   ```

2. **Open in browser:**
   ```
   http://localhost:3000/test
   ```

3. **Test the React components:**
   - Create pledges with forms
   - View real-time statistics
   - See pledge lists
   - All in your Next.js app!

---

### 🤓 AUTOMATED: Full Test Suite

**Run all tests automatically:**
```bash
chmod +x test-all.sh
./test-all.sh
```

OR double-click: `TEST_API.command`

---

## 📋 What's Available to Test?

### 1. Projects API ✅
- Get all projects
- Filter by status (active/pending/completed)
- Filter by category (infrastructure/environment/community)
- Create new projects

### 2. Pledges API ✅ (Your WOW Factor!)
- Get all pledges
- Filter pledges by project
- Create money pledges (€ amounts)
- Create time pledges (volunteer hours)
- Create materials pledges (donations)

### 3. Statistics API ✅
- Get pledge totals for any project
- See breakdown by type (money/time/materials)
- View progress percentage
- Calculate total contributions

---

## 🎯 Recommended Testing Order

**First Time? Follow this:**

1. ✅ **Start Server**
   - Double-click `RUN_ME.command`
   - Wait for "Ready on http://localhost:3000"

2. ✅ **Visual Test (No Code!)**
   - Double-click `api-tester.html`
   - Click "Get All Projects" button
   - Click "Get All Pledges" button
   - Try creating a pledge!

3. ✅ **React Test Page**
   - Open browser to http://localhost:3000/test
   - Fill out the pledge form
   - Submit and see stats update

4. ✅ **Interactive Terminal**
   - Double-click `TEST_INTERACTIVE.command`
   - Choose option 1 (Test ALL Endpoints)
   - Watch comprehensive results

5. ✅ **Check Everything Works!**
   - If all tests pass, you're ready! 🎉

---

## 🐛 Troubleshooting

### Server Won't Start?
```bash
# Kill any process on port 3000
lsof -ti:3000 | xargs kill -9

# Reinstall dependencies
rm -rf node_modules
npm install

# Try again
npm run dev
```

### Tests Show "Connection Refused"?
- Make sure server is running first!
- Check http://localhost:3000 opens in browser
- Verify no firewall blocking port 3000

### Browser Test Page Shows Errors?
- Open browser console (F12)
- Look for error messages
- Check server terminal for API errors

---

## 📊 Expected Results

### Mock Data Included:
- **3 Projects:**
  1. Central Park Renovation (€5,000 budget)
  2. Community Garden (€3,000 budget)
  3. Street Art Project (€2,000 budget)

- **4 Pledges:**
  1. €250 money pledge
  2. 16 hours volunteer time
  3. Materials donation
  4. 8 hours volunteer time

### After Testing You'll See:
- ✅ All API endpoints return 200 OK
- ✅ JSON responses with correct data
- ✅ New pledges get created
- ✅ Statistics update correctly
- ✅ No console errors

---

## 🎉 Success Indicators

**You're good to go when:**
- ✅ Server starts without errors
- ✅ HTML tester shows green checkmarks
- ✅ React test page loads and works
- ✅ Can create and view pledges
- ✅ Statistics calculate correctly

---

## 🚀 Next Steps After Testing

Once all tests pass:

1. **Database Integration**
   - Go to Supabase Dashboard
   - Run the SQL from `src/lib/database.sql`
   - Replace mock data with real queries

2. **Authentication**
   - Test signup/login with real users
   - Verify session persistence

3. **Build Frontend**
   - Create project cards
   - Build pledge forms
   - Design municipality dashboard

---

## 💡 Pro Tips

- **Use HTML tester first** - It's the easiest and most visual
- **Keep server running** - Don't restart between tests
- **Check browser console** - F12 shows helpful errors
- **One test at a time** - If something fails, fix before continuing
- **Read the responses** - The JSON shows what's working

---

## 📞 Files Reference

| File | Purpose |
|------|---------|
| `api-tester.html` | Visual HTML testing interface |
| `test-interactive.sh` | Interactive terminal menu |
| `test-all.sh` | Automated comprehensive test |
| `RUN_ME.command` | Start server (double-click) |
| `TEST_INTERACTIVE.command` | Run interactive tests (double-click) |
| `TEST_API.command` | Run automated tests (double-click) |

---

**Ready? Pick your favorite method and start testing! 🚀**

The HTML tester (`api-tester.html`) is the easiest - just double-click and start clicking buttons!
