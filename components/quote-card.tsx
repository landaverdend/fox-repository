type QCProps = {
  quote: string;
};
export default function QuoteCard({ quote }: QCProps) {


  return <div>{quote}</div>;
}
