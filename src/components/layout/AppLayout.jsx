import { Sidebar } from './Sidebar';
import { Header } from './Header';

export const AppLayout = ({ children }) => {  
  return (
    <div className="flex h-screen bg-aeco-light-bg dark:bg-aeco-dark-bg">
      {/* Sidebar - Fixed Width */}
      <aside className="w-72 border-r border-aeco-light-border dark:border-aeco-dark-border bg-aeco-light-card dark:bg-aeco-dark-card overflow-y-auto flex-shrink-0">
        <Sidebar />
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="border-b border-aeco-light-border dark:border-aeco-dark-border bg-aeco-light-card dark:bg-aeco-dark-card flex-shrink-0">
          <Header />
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto">
          <div className="h-full">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AppLayout;
