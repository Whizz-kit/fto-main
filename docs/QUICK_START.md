# Quick Start Guide - FTO Platform

Je Supabase credentials zijn al geconfigureerd! Volg deze stappen om het platform live te krijgen.

## ✅ Status Check

Open de app en kijk naar de banner bovenaan:
- 🟢 **Groen** = Backend is verbonden, alles werkt!
- 🔵 **Blauw** = Bezig met checken...
- 🟠 **Oranje** = Backend moet nog worden gedeployed

## 🚀 Deployment in 3 Stappen

### Stap 1: Installeer Supabase CLI

```bash
npm install -g supabase
```

### Stap 2: Login & Link Project

```bash
# Login bij Supabase
supabase login

# Link je project (project ID: wflyerojdodjthklfbpc)
supabase link --project-ref wflyerojdodjthklfbpc
```

### Stap 3: Deploy Backend

```bash
# Deploy de Edge Function
supabase functions deploy server

# Klaar! 🎉
```

De banner wordt groen als het werkt!

---

## 👤 Admin Account Aanmaken

### Optie A: Via Supabase Dashboard (Aanbevolen)

1. Ga naar [Supabase Dashboard](https://supabase.com/dashboard)
2. Open je project: **wflyerojdodjthklfbpc**
3. Klik **Authentication** → **Users**
4. Klik **Add User** → **Create new user**
5. Vul in:
   - Email: `admin@fto.world` (of je eigen email)
   - Password: Kies een sterk wachtwoord
   - **Email Confirm**: ✅ Check this (belangrijk!)
6. Klik **Create User**

### Optie B: Via API (Geavanceerd)

Als de backend draait, kun je ook een account aanmaken via de signup route:

```bash
curl -X POST \
  https://wflyerojdodjthklfbpc.supabase.co/functions/v1/make-server-34132228/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@fto.world",
    "password": "jouw-sterke-wachtwoord",
    "name": "Admin"
  }'
```

---

## 📊 Test Data Toevoegen

Na deployment en admin login:

### Methode 1: Via Admin Dashboard

1. Log in op `/admin` met je admin account
2. Klik **"Seed Sample Data"** knop (rechtsboven)
3. Bevestig
4. Sample data wordt toegevoegd!

Dit voegt toe:
- ✅ 8 Directory listings
- ✅ 4 News artikelen
- ✅ 3 Evenementen
- ✅ 12 Knowledge artikelen (3 per categorie)

### Methode 2: Via CSV Import

1. Log in op `/admin`
2. Ga naar **News** of **Explore** tab
3. Klik **"Import CSV"**
4. Selecteer je CSV bestand (zie `/CSV_IMPORT_GUIDE.md` voor formaat)
5. Content wordt geïmporteerd!

---

## 🔍 Verificatie

### Test of alles werkt:

1. **Backend Status**:
   - Groene banner bovenaan = ✅ Werkt
   
2. **Admin Login**:
   - Ga naar footer → klik "Admin"
   - Log in met je credentials
   - Je ziet het CMS dashboard = ✅ Werkt

3. **Content Zichtbaar**:
   - Ga naar `/news` → Zie je artikelen? ✅
   - Ga naar `/explore` → Zie je categorieën? ✅
   - Ga naar `/events` → Zie je evenementen? ✅

4. **CSV Import**:
   - Admin → News → "Import CSV" werkt? ✅

---

## 🐛 Troubleshooting

### Banner blijft oranje

**Probleem**: Backend is niet gedeployed

**Oplossing**:
```bash
supabase functions deploy server
```

Check deployment:
```bash
supabase functions list
```

Je moet "server" in de lijst zien.

### "Failed to fetch" errors

**Probleem**: CORS of credentials probleem

**Oplossing**:
1. Check of Edge Function is gedeployed
2. Verifieer projectId in `/utils/supabase/info.tsx`
3. Check browser console voor details

### Admin login werkt niet

**Probleem**: Geen admin user of verkeerde credentials

**Oplossing**:
1. Ga naar Supabase Dashboard → Authentication → Users
2. Check of je admin user bestaat
3. Zorg dat **email_confirm** is aangevinkt
4. Reset password indien nodig

### Geen data zichtbaar na seed

**Probleem**: Data is wel opgeslagen maar wordt niet geladen

**Oplossing**:
1. Open browser console (F12)
2. Check voor errors
3. Refresh de pagina
4. Check in Admin dashboard of data er staat

### CSV import mislukt

**Probleem**: Verkeerd CSV formaat

**Oplossing**:
1. Zie `/CSV_IMPORT_GUIDE.md` voor correct formaat
2. Check dat kolommen overeenkomen
3. Zorg dat strings met comma's quoted zijn

---

## 📝 Environment Variables

Je hebt deze al geconfigureerd (✅):

```
SUPABASE_URL=https://wflyerojdodjthklfbpc.supabase.co
SUPABASE_ANON_KEY=eyJhbGci... (public key)
SUPABASE_SERVICE_ROLE_KEY=*** (geheim!)
```

⚠️ **Belangrijk**: De SERVICE_ROLE_KEY moet geheim blijven en alleen in de backend gebruikt worden!

---

## 🎯 Next Steps

Na successful deployment:

1. ✅ **Test Admin CMS**: Login en probeer content toe te voegen
2. ✅ **Import je Webflow content**: Gebruik CSV import
3. ✅ **Customize branding**: Update kleuren/logo indien nodig
4. ✅ **Deploy naar productie**: Vercel/Netlify voor live URL
5. ✅ **Custom domain**: Koppel je eigen domein

---

## 📚 Meer Info

- **Volledige deployment**: [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)
- **CSV formaat**: [CSV_IMPORT_GUIDE.md](./CSV_IMPORT_GUIDE.md)
- **CMS handleiding**: [CMS_GUIDE.md](./CMS_GUIDE.md)
- **Backend setup**: [SETUP.md](./SETUP.md)

---

## ✨ Je bent klaar!

Als de banner groen is, werkt alles! 🎉

Je hebt nu:
- ✅ Live Supabase backend
- ✅ Admin CMS toegang
- ✅ CSV import/export
- ✅ News, Events, Explore content
- ✅ Directory filtering

**Veel succes met Find The Others!** 🌌
