# 🚀 Snelle Instructies: Retreat Data Importeren

## Optie 1: Via Admin Panel (Makkelijkst!)

1. **Ga naar Admin**: `http://localhost:5173/admin`
2. **Login** met je admin credentials
3. **Klik op "Listings"** in het menu
4. **Zie de groene knop**: "Import Retreat Data (Delete All & Replace)"
5. **Upload je bestand**:
   - Bestand moet `.tsv` of `.csv` zijn
   - Je TSV data (tab-separated) of geconverteerde CSV
6. **Bevestig** - Alle oude listings worden verwijderd en nieuwe retreat data wordt geïmporteerd!

## Optie 2: Via Conversion Tool (Voor TSV → CSV)

1. **Open**: `http://localhost:5173/retreat-import-tool.html`
2. **Plak** je hele TSV data in het tekstveld
3. **Klik** "Convert to CSV"
4. **Download** de CSV file
5. **Upload** via de groene knop in Admin Panel

---

## Waar is de knop?

In het Admin Panel bij Listings zie je nu:

```
[+ New Listing]  [Import Mock Data]  [Export CSV]  [Import CSV]  [🟢 Import Retreat Data]
```

De groene knop is speciaal voor jouw retreat data!

---

## Wat gebeurt er?

✅ **Stap 1**: Alle huidige listings worden verwijderd
✅ **Stap 2**: TSV wordt geconverteerd naar correct CSV formaat
✅ **Stap 3**: Alle retreat data wordt geïmporteerd
✅ **Klaar**: Alle 200+ retreats zijn nu zichtbaar in de directory!

---

## Bestandsformaat

Je TSV data moet deze kolommen hebben (tab-separated):
```
Item Type	Name	Title (Page)	Short Description	Category (from URL)	Street Address	City	Region/State	Country	...
```

---

## Vragen?

- Zie `/RETREAT_IMPORT_INSTRUCTIONS.md` voor gedetailleerde instructies
- Gebruik `/public/retreat-import-tool.html` voor data conversie
- Check browser console (F12) voor eventuele errors
