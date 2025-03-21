import { Button } from './Button';

interface CardHeaderProps {
  title: string;
  buttonTitle?: string;
  buttonVariant?: 'primary' | 'secondary' | 'outline' | 'danger';
  onClick?: () => void;
}

const CardHeader = ({
  title,
  onClick,
  buttonTitle,
  buttonVariant = 'outline',
}: CardHeaderProps) => {
  return (
    <div className="flex justify-between items-center mb-2">
      <h2 className="text-2xl font-bold mb-6">{title}</h2>
      {onClick && (
        <Button variant={buttonVariant} onClick={onClick}>
          {buttonTitle}
        </Button>
      )}
    </div>
  );
};

export { CardHeader };
export type { CardHeaderProps }; 