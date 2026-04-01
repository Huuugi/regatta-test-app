import React, { useState } from 'react';

export default function RegattaMeldung() {
  // 1. State für die allgemeinen Vereinsdaten
  const [clubInfo, setClubInfo] = useState({
    obmann: '',
    kanuclub: ''
  });

  // 2. State für die Liste aller gemeldeten Athleten
  const [athletenListe, setAthletenListe] = useState([]);

  // 3. State für das Formular des aktuellen Athleten
  const [neuerAthlet, setNeuerAthlet] = useState({
    name: '',
    geburtsdatum: '',
    geschlecht: '',
    distanz100: false,
    distanz200: false,
    distanz500: false
  });

  // Handler für Vereinsdaten
  const handleClubChange = (e) => {
    setClubInfo({ ...clubInfo, [e.target.name]: e.target.value });
  };

  // Handler für Athletendaten (Text & Checkboxen)
  const handleAthletChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNeuerAthlet({
      ...neuerAthlet,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  // Athlet zur Liste hinzufügen
  const handleAddAthlet = (e) => {
    e.preventDefault();
    if (!neuerAthlet.name || !neuerAthlet.geburtsdatum || !neuerAthlet.geschlecht) {
      alert("Bitte fülle Name, Geburtsdatum und Geschlecht aus.");
      return;
    }
    
    setAthletenListe([...athletenListe, neuerAthlet]);
    
    // Formular für den nächsten Athleten leeren (Checkboxen zurücksetzen)
    setNeuerAthlet({
      name: '',
      geburtsdatum: '',
      geschlecht: '',
      distanz100: false,
      distanz200: false,
      distanz500: false
    });
  };

  return (
    <div className="min-h-screen bg-slate-100 p-8 font-sans">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        
        {/* Header */}
        <div className="bg-blue-600 p-6 text-white">
          <h1 className="text-2xl font-bold">Regatta Entry System</h1>
          <p className="text-blue-100">Offizielle Vereinsmeldung</p>
        </div>

        <div className="p-6">
          {/* Sektion 1: Obmann & Club */}
          <div className="mb-8 p-4 bg-slate-50 rounded-lg border border-slate-200">
            <h2 className="text-lg font-semibold mb-4 text-slate-700">1. Vereinsdaten</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-600 mb-1">Kanuclub</label>
                <input 
                  type="text" 
                  name="kanuclub" 
                  value={clubInfo.kanuclub} 
                  onChange={handleClubChange}
                  className="w-full p-2 border border-slate-300 rounded focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="z.B. KC Rapperswil-Jona"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-600 mb-1">Name des Obmanns</label>
                <input 
                  type="text" 
                  name="obmann" 
                  value={clubInfo.obmann} 
                  onChange={handleClubChange}
                  className="w-full p-2 border border-slate-300 rounded focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="Max Muster"
                />
              </div>
            </div>
          </div>

          {/* Sektion 2: Athleten hinzufügen */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold mb-4 text-slate-700">2. Athleten melden</h2>
            <form onSubmit={handleAddAthlet} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-slate-600 mb-1">Name des Athleten</label>
                  <input 
                    type="text" 
                    name="name" 
                    value={neuerAthlet.name} 
                    onChange={handleAthletChange}
                    className="w-full p-2 border border-slate-300 rounded focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-600 mb-1">Geburtsdatum</label>
                  <input 
                    type="date" 
                    name="geburtsdatum" 
                    value={neuerAthlet.geburtsdatum} 
                    onChange={handleAthletChange}
                    className="w-full p-2 border border-slate-300 rounded focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
                {/* Geschlecht */}
                <div>
                  <label className="block text-sm font-medium text-slate-600 mb-2">Geschlecht</label>
                  <div className="flex space-x-4">
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input 
                        type="radio" 
                        name="geschlecht" 
                        value="m" 
                        checked={neuerAthlet.geschlecht === 'm'} 
                        onChange={handleAthletChange}
                        className="text-blue-600 focus:ring-blue-500"
                      />
                      <span>Männlich</span>
                    </label>
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input 
                        type="radio" 
                        name="geschlecht" 
                        value="w" 
                        checked={neuerAthlet.geschlecht === 'w'} 
                        onChange={handleAthletChange}
                        className="text-blue-600 focus:ring-blue-500"
                      />
                      <span>Weiblich</span>
                    </label>
                  </div>
                </div>

                {/* Distanzen */}
                <div>
                  <label className="block text-sm font-medium text-slate-600 mb-2">Distanzen (Mehrfachnennung möglich)</label>
                  <div className="flex space-x-4">
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input 
                        type="checkbox" 
                        name="distanz100" 
                        checked={neuerAthlet.distanz100} 
                        onChange={handleAthletChange}
                        className="rounded text-blue-600 focus:ring-blue-500"
                      />
                      <span>100m</span>
                    </label>
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input 
                        type="checkbox" 
                        name="distanz200" 
                        checked={neuerAthlet.distanz200} 
                        onChange={handleAthletChange}
                        className="rounded text-blue-600 focus:ring-blue-500"
                      />
                      <span>200m</span>
                    </label>
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input 
                        type="checkbox" 
                        name="distanz500" 
                        checked={neuerAthlet.distanz500} 
                        onChange={handleAthletChange}
                        className="rounded text-blue-600 focus:ring-blue-500"
                      />
                      <span>500m</span>
                    </label>
                  </div>
                </div>
              </div>

              <button 
                type="submit" 
                className="mt-4 bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded w-full transition-colors"
              >
                + Athlet zur Meldeliste hinzufügen
              </button>
            </form>
          </div>

          <hr className="my-8 border-slate-200" />

          {/* Sektion 3: Übersicht der gemeldeten Athleten */}
          <div>
            <h2 className="text-lg font-semibold mb-4 text-slate-700">
              3. Aktuelle Meldeliste ({athletenListe.length} Athleten)
            </h2>
            
            {athletenListe.length === 0 ? (
              <p className="text-slate-500 italic text-sm">Noch keine Athleten gemeldet.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-slate-200">
                  <thead className="bg-slate-50">
                    <tr>
                      <th className="py-2 px-4 border-b text-left text-xs font-semibold text-slate-600 uppercase">Name</th>
                      <th className="py-2 px-4 border-b text-left text-xs font-semibold text-slate-600 uppercase">Jahrgang</th>
                      <th className="py-2 px-4 border-b text-left text-xs font-semibold text-slate-600 uppercase">M/W</th>
                      <th className="py-2 px-4 border-b text-left text-xs font-semibold text-slate-600 uppercase">Distanzen</th>
                    </tr>
                  </thead>
                  <tbody>
                    {athletenListe.map((athlet, index) => (
                      <tr key={index} className="hover:bg-slate-50">
                        <td className="py-2 px-4 border-b text-sm text-slate-800">{athlet.name}</td>
                        <td className="py-2 px-4 border-b text-sm text-slate-800">{athlet.geburtsdatum}</td>
                        <td className="py-2 px-4 border-b text-sm text-slate-800 uppercase">{athlet.geschlecht}</td>
                        <td className="py-2 px-4 border-b text-sm text-slate-800">
                          <div className="flex gap-2">
                            {athlet.distanz100 && <span className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded text-xs">100m</span>}
                            {athlet.distanz200 && <span className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded text-xs">200m</span>}
                            {athlet.distanz500 && <span className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded text-xs">500m</span>}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
