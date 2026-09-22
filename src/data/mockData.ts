import { ServiceItem, ProjectItem, ReviewItem } from '../types';

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: 'urgence-electrique',
    number: '01',
    title: 'Urgence & Dépannage 24/7',
    subtitle: 'Intervention prioritaire',
    description: 'Coupure générale, court-circuit, odeur de brûlé ou disjoncteur bloqué : intervention rapide 6j/7 à Nègrepelisse et 40 km.',
    iconName: 'zap',
    image: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&w=1200&q=85',
    features: ['Déplacement express sous 45 min', 'Recherche de panne haute précision', 'Sécurisation immédiate', 'Transparence tarifaire'],
    route: '/services/urgence-electrique'
  },
  {
    id: 'renovation-electrique',
    number: '02',
    title: 'Rénovation électrique',
    subtitle: 'Totale ou partielle',
    description: 'Remise à neuf sécurisée d’installations anciennes, suppression des câbles tissu/plomb et mise en conformité NF C 15-100.',
    iconName: 'refresh',
    image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=85',
    features: ['Diagnostic sur place offert', 'Encastrement ou goulottes soignées', 'Tableau neuf sécurisé', 'Garantie décennale'],
    route: '/services/renovation-electrique'
  },
  {
    id: 'vmc',
    number: '03',
    title: 'VMC & Ventilation',
    subtitle: 'Qualité d’air & économies',
    description: 'Installation et remplacement de VMC hygroréglable A/B et double flux : suppression des moisissures, buée et air sain.',
    iconName: 'wind',
    image: 'https://images.unsplash.com/photo-1615873968403-89e068629265?auto=format&fit=crop&w=1200&q=85',
    features: ['Moteurs basse consommation EC', 'Silence acoustique certifié', 'Économies d’énergie jusqu’à 150€/an', 'Conformité RE2020'],
    route: '/services/vmc'
  },
  {
    id: 'installation',
    number: '04',
    title: 'Installation électrique',
    subtitle: 'Neuf et extensions',
    description: 'Conception et réalisation d’installations électriques complètes pour maisons d’architecte, appartements et locaux professionnels.',
    iconName: 'home',
    image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=85',
    features: ['Câblage basse consommation', 'Distribution optimisée', 'Conformité RE2020', 'Finitions appareillage design']
  },
  {
    id: 'tableau',
    number: '05',
    title: 'Tableau électrique',
    subtitle: 'Remplacement et sécurisation',
    description: 'Modernisation de tableaux électriques vétustes avec coffrets modulaires de dernière génération (Schneider, Legrand, Hager).',
    iconName: 'cpu',
    image: 'https://images.unsplash.com/photo-1544724569-5f546fd6f2b5?auto=format&fit=crop&w=1200&q=85',
    features: ['Disjoncteurs différentiels haute immunité', 'Parafoudre intégré', 'Repérage clair et soigné', 'Évolutivité future']
  },
  {
    id: 'mise-aux-normes',
    number: '06',
    title: 'Mise aux normes',
    subtitle: 'Diagnostic et sécurisation',
    description: 'Audit technique approfondi et mise en sécurité totale de votre habitat selon les exigences strictes de la norme NF C 15-100.',
    iconName: 'shield',
    image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=1200&q=85',
    features: ['Diagnostic différentiel 30mA', 'Mise à la terre certifiée', 'Suppression des risques d’incendie', 'Attestation Consuel']
  },
  {
    id: 'eclairage',
    number: '07',
    title: 'Éclairage',
    subtitle: 'Intérieur & extérieur',
    description: 'Mise en valeur architecturale par bandeaux LED invisibles, spots encastrés basse luminance et scénarios lumineux d’ambiance.',
    iconName: 'lightbulb',
    image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=1200&q=85',
    features: ['Bandeaux LED indirects dimmables', 'Éclairage jardin & piscine IP68', 'Gradation DALI & DMX', 'Économies d’énergie jusqu’à 80%']
  },
  {
    id: 'domotique',
    number: '08',
    title: 'Domotique',
    subtitle: 'Maison connectée',
    description: 'Gestion intelligente centralisée de vos éclairages, volets roulants, chauffage et sécurité sur smartphone ou écran mural.',
    iconName: 'smartphone',
    image: 'https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=1200&q=85',
    features: ['Protocoles KNX & Zigbee', 'Pilotage à distance temps réel', 'Scénarios départ / arrivée', 'Optimisation thermique active']
  }
];

export const PROJECTS_DATA: ProjectItem[] = [
  {
    id: 'proj-1',
    title: 'Tableau électrique',
    category: 'Sécurisation & Puissance',
    location: 'Montauban',
    image: 'https://images.unsplash.com/photo-1544724569-5f546fd6f2b5?auto=format&fit=crop&w=1200&q=85',
    description: 'Refonte complète d’un tableau électrique triphasé dans une villa de 280 m². Intégration d’un parafoudre haute capacité et gestion de charge pour borne de recharge de véhicule électrique.',
    duration: '2 jours d’intervention',
    specs: ['Tableau Legrand Drivia 4 rangées', 'Parafoudre type 2', 'Détection différentielle type F', 'Garantie décennale']
  },
  {
    id: 'proj-2',
    title: 'Rénovation complète',
    category: 'Habitat Contemporain',
    location: 'Caussade',
    image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=85',
    description: 'Réhabilitation électrique totale d’une maison de maître : intégration de goulottes invisibles, appareillage noir mat haut de gamme et distribution multiprise multimédia.',
    duration: '2 semaines',
    specs: ['Appareillage Bticino Living Now', 'Câblage RJ45 Cat 6A', 'Gestion thermique multizone', 'Conformité Consuel']
  },
  {
    id: 'proj-3',
    title: 'Éclairage LED',
    category: 'Design Architectural',
    location: 'Moissac',
    image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=1200&q=85',
    description: 'Création d’une scénographie lumineuse sur-mesure pour une verrière et séjour cathédrale avec gorges lumineuses LED blanc chaud et rétroéclairage cyan.',
    duration: '4 jours',
    specs: ['LED COB 2700K haute fidélité IRC>95', 'Variateurs tactiles muraux', 'Profilés aluminium encastrés', 'Contrôle sans fil']
  },
  {
    id: 'proj-4',
    title: 'Installation neuve',
    category: 'Maison Individuelle',
    location: 'Nègrepelisse',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=85',
    description: 'Conception électrique intégrale d’une construction contemporaine avec piscine extérieure éclairée, pompe à chaleur et gestion automatique de l’ombrage.',
    duration: '3 semaines',
    specs: ['Norme RE2020 validée', 'Éclairage extérieur basse tension IP67', 'Alimentation piscine protégée', 'Certificat Consuel sans réserve']
  },
  {
    id: 'proj-5',
    title: 'Domotique',
    category: 'Smart Home & Confort',
    location: 'Monclar-de-Quercy',
    image: 'https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=1200&q=85',
    description: 'Installation d’un écosystème domotique avec écran tactile mural central, pilotage des volets, caméras IP et retour d’état de consommation électrique en direct.',
    duration: '5 jours',
    specs: ['Écran tactile mural 10 pouces', 'Intégration Apple Home & Google Home', 'Surveillance des watts consommés', 'Scénarios d’ambiance']
  },
  {
    id: 'proj-6',
    title: 'Mise aux normes',
    category: 'Audit & Conformité',
    location: 'Bressols',
    image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=1200&q=85',
    description: 'Mise en conformité urgente d’un local professionnel recevant du public : remplacement des disjoncteurs usagés, équilibrage des phases et éclairage de secours.',
    duration: '3 jours',
    specs: ['Blocs autonomes de secours (BAES)', 'Mesure de terre certifiée < 100 Ω', 'Rapport de conformité officiel', 'Remise aux normes ERP']
  }
];

export const REVIEWS_DATA: ReviewItem[] = [
  {
    id: 'rev-1',
    name: 'Thomas B.',
    rating: 5,
    date: 'Il y a 2 semaines',
    review: 'Un artisan professionnel, ponctuel et très à l’écoute. Le travail est soigné et les explications sont claires. Je recommande sans hésitation !',
    service: 'Rénovation tableau électrique',
    verified: true
  },
  {
    id: 'rev-2',
    name: 'Sophie L.',
    rating: 5,
    date: 'Il y a 1 mois',
    review: 'Rénovation complète de notre installation électrique. Travail impeccable, équipe sympa et très réactive. Nous sommes ravis du résultat !',
    service: 'Rénovation complète & Éclairage',
    verified: true
  },
  {
    id: 'rev-3',
    name: 'Marc D.',
    rating: 5,
    date: 'Il y a 3 semaines',
    review: 'Dépannage en urgence un samedi soir suite à une disjonction générale. Arrivé en moins d’une heure, panne identifiée et réparée avec un grand professionnalisme.',
    service: 'Dépannage d’urgence',
    verified: true
  },
  {
    id: 'rev-4',
    name: 'Aurélie V.',
    rating: 5,
    date: 'Il y a 1 mois',
    review: 'Installation de notre domotique et des bandeaux LED dans notre nouvelle maison. Le résultat est tout simplement futuriste et magnifique. Merci MAZIOUDELEC !',
    service: 'Domotique & Éclairage architectural',
    verified: true
  }
];

export const TOWNS_COVERED = [
  { name: 'Nègrepelisse', isMain: true, zip: '82800', distance: 'Siège' },
  { name: 'Montauban', isMain: false, zip: '82000', distance: '15 min' },
  { name: 'Caussade', isMain: false, zip: '82300', distance: '15 min' },
  { name: 'Albias', isMain: false, zip: '82350', distance: '8 min' },
  { name: 'Moissac', isMain: false, zip: '82200', distance: '30 min' },
  { name: 'Monclar-de-Quercy', isMain: false, zip: '82230', distance: '15 min' },
  { name: 'Bressols', isMain: false, zip: '82710', distance: '20 min' },
  { name: 'et +', isMain: false, zip: 'Rayon 40 km', distance: 'Tarn-et-Garonne (82)' }
];
