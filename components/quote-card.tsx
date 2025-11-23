type QCProps = {
  quote: string;
  className?: string;
};
export default function QuoteCard({ quote, className }: QCProps) {
  return (
    <div className={`bg-foxbg p-4 rounded-md ${className}`}>
      <p className="text-slate text-lg">{quote}</p>
    </div>
  );
}
