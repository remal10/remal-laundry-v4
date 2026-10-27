import React, { useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Activity, Bell, Boxes, Check, ChevronDown, CircleHelp, ClipboardList, Clock3, LayoutDashboard, Menu, Plus, Search, Shirt, Sparkles, Users, X } from 'lucide-react';
import './styles.css';

const demoOrders = [
  { id: 'RL-1048', guest: 'Chambre 214', service: 'Lavage & repassage', pieces: 8, total: 96, status: 'En cours', time: '14:35' },
  { id: 'RL-1047', guest: 'Chambre 508', service: 'Nettoyage à sec', pieces: 3, total: 75, status: 'À collecter', time: '14:10' },
  { id: 'RL-1046', guest: 'Chambre 126', service: 'Lavage express', pieces: 5, total: 62, status: 'Prête', time: '13:42' },
  { id: 'RL-1045', guest: 'Chambre 331', service: 'Lavage & repassage', pieces: 11, total: 132, status: 'En cours', time: '13:15' },
  { id: 'RL-1044', guest: 'Chambre 402', service: 'Repassage', pieces: 4, total: 36, status: 'Prête', time: '12:58' }
];

const nav = [
  { label: 'Vue d’ensemble', icon: LayoutDashboard },
  { label: 'Commandes', icon: ClipboardList },
  { label: 'Stock & linge', icon: Boxes },
  { label: 'Équipe', icon: Users }
];

function App() {
  const [section, setSection] = useState('Vue d’ensemble');
  const [orders, setOrders] = useState(demoOrders);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('Toutes');
  const [showForm, setShowForm] = useState(false);
  const [mobileNav, setMobileNav] = useState(false);
  const [notice, setNotice] = useState('');
  const [form, setForm] = useState({ guest: '', service: 'Lavage & repassage', pieces: '1' });

  const filteredOrders = useMemo(() => orders.filter(o => {
    const matchesSearch = [o.id, o.guest, o.service].join(' ').toLowerCase().includes(search.toLowerCase());
    return matchesSearch && (filter === 'Toutes' || o.status === filter);
  }), [orders, search, filter]);

  function createOrder(e) {
    e.preventDefault();
    const pieces = Math.max(1, Number(form.pieces) || 1);
    const price = form.service === 'Nettoyage à sec' ? 25 : form.service === 'Repassage' ? 9 : 12;
    const next = { id: 'RL-' + (1049 + orders.length - demoOrders.length), guest: form.guest.trim(), service: form.service, pieces, total: pieces * price, status: 'Nouvelle', time: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }) };
    setOrders(prev => [next, ...prev]);
    setShowForm(false);
    setForm({ guest: '', service: 'Lavage & repassage', pieces: '1' });
    setNotice('Commande ajoutée à la démonstration. Elle n’a pas été enregistrée en base de données.');
    setSection('Commandes');
  }

  const stats = [
    { label: 'Commandes du jour', value: String(orders.length + 23), delta: 'Donnée de démonstration', icon: ClipboardList },
    { label: 'En traitement', value: String(orders.filter(o => o.status === 'En cours').length + 4), delta: 'Donnée de démonstration', icon: Activity },
    { label: 'Prêtes à livrer', value: String(orders.filter(o => o.status === 'Prête').length + 2), delta: 'Donnée de démonstration', icon: Check },
    { label: 'Chiffre du jour', value: 'AED 2,480', delta: 'Montant fictif', icon: Sparkles }
  ];

  return <div className="app-shell">
    <aside className={'sidebar ' + (mobileNav ? 'sidebar-open' : '')}>
      <div className="brand"><div className="brand-mark"><Shirt size={22}/></div><div><strong>REMAL <span>LAUNDRY</span></strong><small>OPERATIONS SYSTEM · V4</small></div><button className="icon-btn mobile-close" onClick={() => setMobileNav(false)} aria-label="Fermer le menu"><X size={18}/></button></div>
      <div className="workspace-label">ESPACE DE TRAVAIL</div>
      <div className="workspace"><div className="workspace-dot">R</div><div><strong>Remal Hotel</strong><small>Blanchisserie</small></div><ChevronDown size={16}/></div>
      <nav>{nav.map(({label, icon: Icon}) => <button key={label} className={'nav-item ' + (section === label ? 'active' : '')} onClick={() => {setSection(label); setMobileNav(false);}}><Icon size={18}/><span>{label}</span>{label === 'Commandes' && <span className="nav-count">{orders.length}</span>}</button>)}</nav>
      <div className="sidebar-bottom"><div className="help-card"><div className="help-icon"><CircleHelp size={18}/></div><strong>Besoin d’aide ?</strong><p>La V4 est en cours de construction. Les données affichées sont fictives.</p></div><div className="profile"><div className="avatar">RL</div><div><strong>Équipe Remal</strong><small>Mode aperçu V4</small></div><ChevronDown size={15}/></div></div>
    </aside>
    <main className="main">
      <header className="topbar"><button className="icon-btn menu-toggle" onClick={() => setMobileNav(true)} aria-label="Ouvrir le menu"><Menu size={20}/></button><div className="breadcrumbs">Remal Hotel <span>/</span> <strong>{section}</strong></div><div className="top-actions"><span className="preview-pill"><span/> Aperçu de développement</span><button className="icon-btn notification" aria-label="Notifications" onClick={() => setNotice('Aucune notification connectée dans cette version de démonstration.')}><Bell size={18}/><i/></button><div className="top-avatar">RL</div></div></header>
      <div className="content">
        <div className="page-heading"><div><div className="eyebrow"><span className="eyebrow-line"/> GESTION DE BLANCHISSERIE</div><h1>{section === 'Vue d’ensemble' ? 'Vue d’ensemble' : section}</h1><p>{section === 'Vue d’ensemble' ? 'Suivez les opérations et les commandes de votre équipe.' : section === 'Commandes' ? 'Consultez et gérez les commandes de blanchisserie.' : section === 'Stock & linge' ? 'Espace préparé pour le suivi des stocks et du linge.' : 'Espace préparé pour la gestion de l’équipe.'}</p></div><button className="primary-btn" onClick={() => setShowForm(true)}><Plus size={17}/> Nouvelle commande</button></div>
        {notice && <div className="notice"><span>{notice}</span><button onClick={() => setNotice('')} aria-label="Fermer"><X size={16}/></button></div>}
        <div className="demo-warning"><span className="warning-dot"/> <strong>Mode aperçu</strong><span>Les indicateurs et commandes sont des exemples. Aucune donnée réelle n’est connectée à Supabase.</span></div>
        {section === 'Vue d’ensemble' && <>
          <div className="stats-grid">{stats.map(({label, value, delta, icon: Icon}) => <article className="stat-card" key={label}><div className="stat-top"><span>{label}</span><div className="stat-icon"><Icon size={18}/></div></div><div className="stat-value">{value}</div><div className="stat-foot"><span className="neutral-dot"/> {delta}</div></article>)}</div>
          <section className="panel"><div className="panel-heading"><div><h2>Commandes récentes</h2><p>Suivi des commandes — exemples uniquement</p></div><button className="text-btn" onClick={() => setSection('Commandes')}>Voir toutes <span>→</span></button></div><OrdersTable orders={orders.slice(0,5)} onStatus={(id,status) => setOrders(prev => prev.map(o => o.id === id ? {...o,status} : o))}/></section>
          <div className="bottom-grid"><section className="panel small-panel"><div className="panel-heading"><div><h2>Flux de travail</h2><p>Étapes de traitement</p></div><Activity size={18} className="muted-icon"/></div><div className="workflow"><div className="workflow-step"><span className="workflow-number">01</span><div><strong>Collecte</strong><small>Réception du linge</small></div><span className="step-tag">Étape 1</span></div><div className="workflow-step"><span className="workflow-number">02</span><div><strong>Traitement</strong><small>Lavage et finition</small></div><span className="step-tag">Étape 2</span></div><div className="workflow-step"><span className="workflow-number">03</span><div><strong>Livraison</strong><small>Retour en chambre</small></div><span className="step-tag">Étape 3</span></div></div></section><section className="panel small-panel integration-card"><div className="integration-symbol"><Activity size={20}/></div><div><h2>Prochaine étape</h2><p>Connexion sécurisée au nouveau projet Supabase, puis migration des règles métier existantes.</p><span className="integration-status"><span/> Connexion en attente</span></div></section></div>
        </>}
        {section === 'Commandes' && <section className="panel"><div className="orders-toolbar"><div className="searchbox"><Search size={17}/><input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Rechercher une commande…"/></div><select value={filter} onChange={e=>setFilter(e.target.value)} aria-label="Filtrer par statut"><option>Toutes</option><option>Nouvelle</option><option>En cours</option><option>À collecter</option><option>Prête</option></select></div><OrdersTable orders={filteredOrders} onStatus={(id,status) => setOrders(prev => prev.map(o => o.id === id ? {...o,status} : o))}/>{filteredOrders.length===0 && <div className="empty-state">Aucune commande ne correspond à cette recherche.</div>}</section>}
        {section === 'Stock & linge' && <section className="panel placeholder-panel"><div className="placeholder-icon"><Boxes size={26}/></div><h2>Module stock & linge</h2><p>La structure de l’écran est prête. La migration du stock réel et des règles de gestion depuis la V3 reste à effectuer.</p><span className="integration-status"><span/> En attente de migration</span></section>}
        {section === 'Équipe' && <section className="panel placeholder-panel"><div className="placeholder-icon"><Users size={26}/></div><h2>Module équipe</h2><p>La gestion des rôles et des accès sera reliée à Supabase après vérification des règles de sécurité.</p><span className="integration-status"><span/> En attente de migration</span></section>}
        <footer className="footer"><span>REMAL LAUNDRY OS <b>V4</b></span><span>Nouvelle application · indépendante de la V3</span><span><Clock3 size={13}/> Build de départ</span></footer>
      </div>
    </main>
    {showForm && <div className="modal-backdrop" onMouseDown={e=>{if(e.target===e.currentTarget)setShowForm(false)}}><form className="modal" onSubmit={createOrder}><div className="modal-header"><div><span className="eyebrow">NOUVELLE ENTRÉE</span><h2>Créer une commande</h2></div><button type="button" className="icon-btn" onClick={() => setShowForm(false)} aria-label="Fermer"><X size={18}/></button></div><p className="modal-note">Cette action modifie uniquement les données de démonstration de cette page.</p><label>Chambre ou référence client<input required value={form.guest} onChange={e=>setForm({...form,guest:e.target.value})} placeholder="Ex. Chambre 214"/></label><label>Type de service<select value={form.service} onChange={e=>setForm({...form,service:e.target.value})}><option>Lavage & repassage</option><option>Nettoyage à sec</option><option>Repassage</option></select></label><label>Nombre de pièces<input required min="1" type="number" value={form.pieces} onChange={e=>setForm({...form,pieces:e.target.value})}/></label><div className="modal-actions"><button type="button" className="secondary-btn" onClick={() => setShowForm(false)}>Annuler</button><button type="submit" className="primary-btn">Ajouter la commande</button></div></form></div>}
  </div>;
}

function OrdersTable({orders, onStatus}) {
  return <div className="table-wrap"><table><thead><tr><th>COMMANDE</th><th>CLIENT / CHAMBRE</th><th>SERVICE</th><th>PIÈCES</th><th>TOTAL</th><th>STATUT</th></tr></thead><tbody>{orders.map(o=><tr key={o.id}><td><strong className="order-id">{o.id}</strong><small className="order-time">{o.time}</small></td><td className="guest-cell">{o.guest}</td><td>{o.service}</td><td>{o.pieces}</td><td className="amount">{o.total} AED</td><td><select className={'status-select status-' + o.status.toLowerCase().replaceAll(' ','-')} value={o.status} onChange={e=>onStatus(o.id,e.target.value)} aria-label={'Statut '+o.id}><option>Nouvelle</option><option>En cours</option><option>À collecter</option><option>Prête</option></select></td></tr>)}</tbody></table></div>;
}

createRoot(document.getElementById('root')).render(<React.StrictMode><App/></React.StrictMode>);