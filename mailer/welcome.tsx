import * as React from 'react';

interface WelcomeTemplateProps {
	name: string;
	role: number;
}

export const WelcomeTemplate: React.FC<Readonly<WelcomeTemplateProps>> = ({ name, role }) => (
	<>
		<h1>Benvenuto, {name}!</h1>
		<p>Sei stato registrato come {role == 1 ? 'Admin' : 'HR'}</p>
		<p>Con questo roulo potrai:</p>
		<ul>
			<li>Creare, modificare, elimniare annunci</li>
			<li>Caricare immagini e scegliere i reparti a cui è rivolta ogni comunicazione</li>
			<li>Visualizzare i dettagli di ogni annuncio</li>
			<li>Conoscere le modifiche recenti di ogni annuncio</li>
			<li>Cambiare la password del tuo account (consigliato)</li>
			{role == 1 && (
				<>
					<li>Creare, modificare, eliminare utenti</li>{' '}
					<li>Creare, modificare, eliminare reparti target (es. IT, HR, Marketing...)</li>
					<li>Aggiungere, rimuovere utenti dalla mailing list divisa per categorie</li>
				</>
			)}
		</ul>
		<p>Per qualsiasi dubbio o problema, contatta il supporto.</p>
	</>
);
