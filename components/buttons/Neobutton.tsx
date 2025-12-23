import './NeoButton.css';

interface NeoButtonProps {
  onClick: () => void;
  children: React.ReactNode;
}

export function NeoButton({ onClick, children }: NeoButtonProps) {
  return (
    <button className="neo-button" onClick={onClick}>
      <div>
        <span>{children}</span>
      </div>
    </button>
  );
}