# 🏛️ PolisPraxis 2.0 - Complete Platform Architecture

## 📋 Περιεχόμενα

Η PolisPraxis είναι μια **ολοκληρωμένη πλατφόρμα** που συνδέει δημότες, εθελοντές, επαγγελματίες και δήμο.

### 🎯 3 Κύρια Features:

1. **📅 Booking System** - Ραντεβού με Ειδικούς (επιδοτούμενα από δήμο)
2. **🆘 Help Requests** - Αιτήματα Βοήθειας (εθελοντισμός)
3. **🏗️ Civic Projects** - Προτάσεις Έργων με Pledges (ΗΔΗ ΕΧΟΥΜΕ)
4. **🤖 AI Chatbot** - Έξυπνος βοηθός (optional)

---

## 1️⃣ Booking System (Κλείσιμο Ραντεβού με Ειδικούς)

### Πώς Λειτουργεί:

1. **Δημότης** αναζητά ειδικό (π.χ. ηλεκτρολόγο)
2. Βλέπει διαθέσιμους **επαγγελματίες** με:
   - Κανονική τιμή: €50/ώρα
   - **Επιδοτημένη τιμή**: €15/ώρα (πληρώνει δήμος €35)
3. Κλείνει ραντεβού για συγκεκριμένη μέρα/ώρα
4. Επαγγελματίας επιβεβαιώνει
5. Μετά την ολοκλήρωση: **ratings & reviews**

### Επαγγέλματα που Υποστηρίζουμε:

- ⚡ Ηλεκτρολόγος
- 🚰 Υδραυλικός
- 🪵 Μαραγκός
- 🎨 Βαφέας
- 🏗️ Οικοδόμος
- ❄️ Τεχνικός Κλιματισμού
- 🌳 Κηπουρός
- 🧹 Καθαριστής/Καθαρίστρια
- 🔑 Κλειδαράς
- 🔧 Επισκευή Συσκευών

### Database Tables:

```sql
- professionals (ειδικοί με λεπτομέρειες)
- bookings (ραντεβού)
```

### API Endpoints (ΘΑ ΦΤΙΑΞΟΥΜΕ):

```
GET  /api/professionals                    - Λίστα ειδικών
GET  /api/professionals?profession=plumber  - Φίλτρο ανά επάγγελμα
GET  /api/professionals/:id                - Λεπτομέρειες ειδικού
POST /api/professionals                    - Εγγραφή ειδικού

GET  /api/bookings                         - Τα ραντεβού μου
POST /api/bookings                         - Κλείσιμο ραντεβού
PUT  /api/bookings/:id                     - Update ραντεβού
DELETE /api/bookings/:id                   - Ακύρωση
```

---

## 2️⃣ Help Requests (Αιτήματα Βοήθειας από Εθελοντές)

### Πώς Λειτουργεί:

1. **Δημότης** δημιουργεί αίτημα βοήθειας:
   - "Χρειάζομαι βοήθεια για μετακόμιση"
   - "Ψάχνω για συντροφιά (ηλικιωμένος)"
   - "Χρειάζομαι βοήθεια με υπολογιστή"

2. **Εθελοντές** βλέπουν όλα τα αιτήματα

3. Κάποιος εθελοντής παίρνει το αίτημα

4. Το ολοκληρώνουν μαζί

5. **Rating & feedback**

### Κατηγορίες Βοήθειας:

- 🔧 Μικροεπισκευές
- 📦 Μετακόμιση
- 🌱 Κηπουρική
- 🛒 Ψώνια
- 👥 Συντροφιά
- 💻 Τεχνολογία
- 🌍 Μετάφραση
- 📚 Ιδιαίτερα Μαθήματα
- 🐕 Φροντίδα Κατοικιδίων

### Database Tables:

```sql
- help_requests (αιτήματα βοήθειας)
```

### API Endpoints (ΘΑ ΦΤΙΑΞΟΥΜΕ):

```
GET  /api/help-requests                 - Όλα τα αιτήματα
GET  /api/help-requests?status=open     - Μόνο ανοιχτά
POST /api/help-requests                 - Δημιουργία αιτήματος
PUT  /api/help-requests/:id/assign      - Εθελοντής παίρνει το αίτημα
PUT  /api/help-requests/:id/complete    - Ολοκλήρωση
```

---

## 3️⃣ Civic Projects (Προτάσεις Έργων) ✅ ΗΔΗ ΕΧΟΥΜΕ

### Πώς Λειτουργεί:

1. Δημότης προτείνει έργο (π.χ. "Ανακαίνιση πάρκου")
2. Δήμος εγκρίνει/απορρίπτει
3. Άλλοι δημότες κάνουν **pledges**:
   - 💰 Χρήματα (€50, €100)
   - ⏰ Χρόνο (8 ώρες εθελοντισμού)
   - 📦 Υλικά (εργαλεία, σπόρους, κλπ)
4. Όταν φτάσει το budget → το έργο ξεκινά!

### Database Tables: ✅ ΕΧΟΥΜΕ

```sql
- projects
- pledges
```

### API Endpoints: ✅ ΕΧΟΥΜΕ

```
GET  /api/projects
POST /api/projects
GET  /api/pledges
POST /api/pledges
GET  /api/pledges/stats
```

---

## 4️⃣ AI Chatbot (Έξυπνος Βοηθός) - Optional

### Πώς Λειτουργεί:

Ο χρήστης γράφει:
> "Έσπασε η βρύση μου και τρέχει νερό"

**AI απαντά:**
> "Φαίνεται ότι χρειάζεσαι **υδραυλικό**! Θα σε βοηθήσω να βρεις έναν. Θέλεις να δεις διαθέσιμους υδραυλικούς στην περιοχή σου;"

**Options:**
1. Κλείσε ραντεβού με υδραυλικό
2. Δημιούργησε αίτημα βοήθειας
3. Δες οδηγίες DIY

### Database Tables:

```sql
- chatbot_conversations
```

### API Endpoints (ΘΑ ΦΤΙΑΞΟΥΜΕ):

```
POST /api/chatbot/message    - Στείλε μήνυμα
GET  /api/chatbot/history    - Ιστορικό συνομιλίας
```

---

## 🗂️ Δομή Βάσης Δεδομένων (Supabase)

### Πίνακες (Tables):

1. **profiles** - Όλοι οι χρήστες
2. **professionals** - Εγγεγραμμένοι ειδικοί
3. **bookings** - Ραντεβού με ειδικούς
4. **help_requests** - Αιτήματα βοήθειας
5. **projects** - Προτάσεις έργων
6. **pledges** - Pledges για έργα
7. **chatbot_conversations** - AI συνομιλίες
8. **notifications** - Ειδοποιήσεις

---

## 🚀 Workflow για Developer

### Phase 1: Authentication & Profiles ✅ ΕΧΟΥΜΕ
- [x] Supabase Auth setup
- [x] Sign up / Sign in
- [x] User profiles
- [ ] Επέκταση profiles για professional role

### Phase 2: Booking System 🔨 ΘΑ ΚΑΝΟΥΜΕ
- [ ] API για professionals
- [ ] API για bookings
- [ ] React hook `useBookings`
- [ ] Φόρμα κλεισίματος ραντεβού
- [ ] Λίστα διαθέσιμων ειδικών
- [ ] Calendar picker

### Phase 3: Help Requests 🔨 ΘΑ ΚΑΝΟΥΜΕ
- [ ] API για help requests
- [ ] React hook `useHelpRequests`
- [ ] Φόρμα δημιουργίας αιτήματος
- [ ] Λίστα ανοιχτών αιτημάτων
- [ ] "Θέλω να βοηθήσω" button

### Phase 4: Civic Projects ✅ ΕΧΟΥΜΕ
- [x] API έτοιμο
- [x] Hooks έτοιμα
- [x] Test page

### Phase 5: Municipality Dashboard 🔨 ΘΑ ΚΑΝΟΥΜΕ
- [ ] Approve/reject projects
- [ ] Approve professionals
- [ ] Statistics & analytics
- [ ] Subsidy management

### Phase 6: Frontend UI 🔨 ΘΑ ΚΑΝΟΥΜΕ
- [ ] Home page (από συνάδελφο)
- [ ] Navigation
- [ ] Dashboard για δημότες
- [ ] Dashboard για ειδικούς
- [ ] Dashboard για εθελοντές
- [ ] Municipality dashboard

### Phase 7: AI Chatbot (Optional) 🤖
- [ ] OpenAI integration
- [ ] Chat UI
- [ ] Context-aware responses

---

## 📱 User Journeys

### 🔹 Ως Δημότης (Citizen):

1. **Εγγραφή/Σύνδεση**
2. Επιλέγω:
   - 📅 Κλείσε ραντεβού με ειδικό
   - 🆘 Ζήτα βοήθεια από εθελοντή
   - 🏗️ Πρότεινε έργο ή κάνε pledge
3. Παρακολουθώ την πρόοδο
4. Βαθμολογώ & review

### 🔹 Ως Επαγγελματίας (Professional):

1. **Εγγραφή ως ειδικός** (περιμένω έγκριση δήμου)
2. Ορίζω τιμές & διαθεσιμότητα
3. Βλέπω αιτήματα ραντεβού
4. Επιβεβαιώνω/Απορρίπτω
5. Ολοκληρώνω δουλειά → λαμβάνω πληρωμή

### 🔹 Ως Εθελοντής (Volunteer):

1. **Σύνδεση**
2. Βλέπω ανοιχτά αιτήματα βοήθειας
3. Επιλέγω να βοηθήσω
4. Ολοκληρώνω → λαμβάνω feedback

### 🔹 Ως Δήμος (Municipality):

1. **Admin dashboard**
2. Εγκρίνω/Απορρίπτω:
   - Προτάσεις έργων
   - Εγγραφές επαγγελματιών
3. Παρακολουθώ:
   - Budget για επιδοτήσεις
   - Statistics
   - Αξιολογήσεις

---

## 🎨 Frontend Structure (Προτεινόμενη)

```
src/app/
├── page.tsx                    # Home (από συνάδελφο)
├── auth/
│   └── page.tsx                # Login/Register ✅
├── dashboard/
│   └── page.tsx                # Προσωπικό dashboard
├── bookings/
│   ├── page.tsx                # Λίστα ραντεβού μου
│   ├── new/
│   │   └── page.tsx            # Κλείσε νέο ραντεβού
│   └── [id]/
│       └── page.tsx            # Λεπτομέρειες ραντεβού
├── professionals/
│   ├── page.tsx                # Λίστα ειδικών
│   └── [id]/
│       └── page.tsx            # Profile ειδικού
├── help/
│   ├── page.tsx                # Λίστα αιτημάτων
│   ├── new/
│   │   └── page.tsx            # Νέο αίτημα
│   └── [id]/
│       └── page.tsx            # Λεπτομέρειες αιτήματος
├── projects/                   # ✅ ΗΔΗ ΥΠΑΡΧΟΥΝ
│   ├── page.tsx
│   ├── create/
│   └── [id]/
├── municipality/
│   └── page.tsx                # Municipality dashboard
└── chatbot/
    └── page.tsx                # AI Chat (optional)
```

---

## 🔄 Next Steps (Τι κάνουμε τώρα;)

### ΑΜΕΣΑ (Προτεραιότητα 1):

1. **Πού είναι η αρχική σελίδα του συναδέλφου;**
   - Θα την ενσωματώσουμε στο `src/app/page.tsx`

2. **Επιλέξτε ποιο feature να φτιάξουμε πρώτα:**
   - Α) Booking System (ραντεβού)
   - Β) Help Requests (αιτήματα βοήθειας)
   - Γ) Authentication flow (sign up page με UI)

3. **Τρέξε το SQL στο Supabase:**
   - Άνοιξε Supabase Dashboard
   - SQL Editor
   - Copy-paste από `src/lib/database.sql`
   - Run!

---

## 📞 Επόμενο Βήμα

**Πες μου:**
1. Πού είναι η αρχική σελίδα;
2. Ποιο feature να φτιάξουμε πρώτα;
3. Έχεις τρέξει το SQL στο Supabase;

Και ξεκινάμε! 🚀
