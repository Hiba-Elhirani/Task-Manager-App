import { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Cell, ResponsiveContainer } from "recharts";

export default function Acceuil(){
    const[inputTitle, setinputTitle] = useState("");
    const[dateDebut, setdateDebut] = useState("");
    const[dateFin, setdateFin] = useState("");
    const[name, setinputName] = useState("");
    const[tache, setTache] = useState([]);
    const[statut, setStatut] = useState("A Faire");
    const[editIndex, setEditIndex] = useState(null);
    const[search, setSearch] = useState("");


    // Ajouter une nouvelle tache
    const AjouterBtn = () => {
        if (inputTitle === "" || dateDebut === "" || dateFin === "" || name === "" || statut === "") {
            alert("Veuillez remplir tous les champs!");
            return;
        }

    const nouvelleTache = {
        text: inputTitle,
        dateDebut: dateDebut,
        dateFin: dateFin,
        name: name,
        statut: statut,
    };

    if (editIndex === null) {
        setTache([...tache, nouvelleTache]);
    } else {
        setTache(tache.map((t, i) => i === editIndex ? nouvelleTache : t));
        setEditIndex(null);
    }
        setinputTitle("");
        setdateDebut("");
        setdateFin("");
        setinputName("");
        setStatut("A Faire");
    };
    // Supprimer une tache
    const suppTache = (index) => {
        setTache(tache.filter((t, i) => i !== index));
    };

    //Modifier une tache 
    const modifierTache = (index) =>{
        const t = tache[index];
        setinputTitle(t.text);
        setdateDebut(t.dateDebut);
        setdateFin(t.dateFin);
        setinputName(t.name);
        setStatut(t.statut);
        setEditIndex(index)
    }
    const tachesFilter = tache.filter((t) => t.text.toLowerCase().includes(search.toLowerCase()));
    const totaleTache = tache.reduce((acc) => acc + 1,0 );
    const aujourdhui = new Date().toLocaleDateString("en-CA");
    // retourne les tache en retard
    const estEnRetard = (t) => t.dateFin !== "" && t.dateFin < aujourdhui && t.statut !== "Termine";
    const nbRetard = tache.reduce((acc, t) => estEnRetard(t) ? acc + 1 : acc, 0);
    const COULEURS = ["#EF9F27", "#378ADD", "#639922"];
    // Data 
    const data = [
        { statut: "A Faire",  nombre: tache.filter(t => t.statut === "A Faire").length },
        { statut: "En Cours", nombre: tache.filter(t => t.statut === "En Cours").length },
        { statut: "Termine",  nombre: tache.filter(t => t.statut === "Termine").length }
    ]
    return(
        <>     
            <div className="container">
                <h1>GESTION DES TACHES</h1>
                <div className="Inputbox">
                    <div className="champ">
                        <label>Tâche</label>
                        <input className="input" type="text" value={inputTitle} placeholder="Saisir votre tache..." onChange={(e) => setinputTitle(e.target.value)}/>
                    </div>
                    <div className="champ">
                        <label>Date début</label>
                        <input className="input" type="date" value={dateDebut} onChange={(e) => setdateDebut(e.target.value)}/>
                    </div>
                    <div className="champ">
                        <label>Date fin</label>
                        <input className="input" type="date" value={dateFin} onChange={(e) => setdateFin(e.target.value)}/>
                    </div>
                    <div className="champ">
                        <label>Ressource</label>
                        <input className="input" type="text" value={name} placeholder="Saisir votre Nom..." onChange={(e) => setinputName(e.target.value)}/>
                    </div>
                    <div className="champ">
                        <label>Statut</label>
                        <select value={statut} onChange={(e) => setStatut(e.target.value)}>
                            <option value="A Faire">A Faire</option>
                            <option value="En Cours">En Cours</option>
                            <option value="Termine">Termine</option>
                        </select>
                    </div>
                    <button className="mainBtn" onClick={AjouterBtn}>Ajouter</button>
                </div>
                <div className="content">
                    <div className="tableContent">
                        <div className="inputContent">
                            <label>Rechercher Votre Tache: </label>
                            <input className="input" type="search" value={search} placeholder="..."onChange={(e) => setSearch(e.target.value)}/>
                        </div>
                        <div className="tableau">
                            <table border={1}>
                                <tr>
                                    <th>TACHES</th>
                                    <th>DATE DEBUT</th>
                                    <th>DATE FIN</th>
                                    <th>Ressource</th>
                                    <th>STATUT</th>
                                    <th>ACTION</th>
                                </tr>
                                    {tachesFilter.map((t, index) => (
                                        <tr key = {index}>
                                            <td style={{textDecoration: t.statut == "Termine" ? "line-through" : "none"}}>
                                                {t.text}
                                            </td>
                                            <td>{t.dateDebut}</td>
                                            <td>{t.dateFin}</td>
                                            <td>{t.name}</td>
                                            <td style={{ color: estEnRetard(t) ? "#ef4444" : "inherit"}}>
                                                {t.statut}
                                            </td>
                                            <td>
                                            <button className="btn" onClick={() => suppTache(index)}>Supprimer</button>
                                            <button className="btn" onClick={() => modifierTache(index)}>Modifier</button>
                                            </td>
                                        </tr>
                                    ))}
                            </table>
                        </div>
                    </div>
                    <div className="charts">
                        <p className="chart-titre">Taches par statut</p>
                        <div className="chart-zone">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={data}>
                                    <XAxis dataKey="statut" stroke="#555" tick={{ fill: "#b5b5c5", fontSize: 12 }} tickLine={false} />
                                    <YAxis stroke="#555" tick={false} tickLine={false} allowDecimals={false} />
                                    <Tooltip
                                        contentStyle={{ background: "#0b0b1a", border: "1px solid #2a2a40", color: "#fff" }}
                                        cursor={{ fill: "rgba(255,255,255,0.05)" }}/>
                                    <Bar dataKey="nombre" radius={[4, 4, 0, 0]}>
                                        {data.map((d, i) => (
                                            <Cell key={i} fill={COULEURS[i]} />
                                        ))}
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>
                <div className="content2">
                    <div className="taskNbr">
                        <h2>Nombre Total des Taches:</h2>
                        <span>{totaleTache}</span>
                    </div>
                    <div className="overdueTask">
                        <h2>Nombre Total des Taches:</h2>
                        <span>{nbRetard}</span>
                    </div>
                </div>
            </div>

        </>
    )
} 