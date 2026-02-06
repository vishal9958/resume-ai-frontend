interface CardProps {
  title: string;
  description: string;
}

const Card = ({ title, description }: CardProps) => {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition">
      <h3 className="text-lg font-semibold text-gray-800">
        {title}
      </h3>
      <p className="mt-3 text-gray-600 text-sm">
        {description}
      </p>
    </div>
  );
};

export default Card;
