import '@digdir/designsystemet-css';
//import './custom.css'; 


export const metadata = {
  title: 'A11y Activist Podcast',
  description: 'En podkast om digital universell utforming og webstandarder',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="no">
      <body>
        {children}
      </body>
    </html>
  );
}
