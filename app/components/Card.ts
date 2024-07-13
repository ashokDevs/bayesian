// components/Card.tsx
import React from "react";

interface CardProps {
  item: {
    min_business_miles: number | null;
    min_business_tax: number | null;
    min_economy_miles: number | null;
    min_economy_tax: number | null;
    min_first_miles: number | null;
    min_first_tax: number | null;
    partner_program: string;
  };
}

const Card: React.FC<CardProps> = ({ item }) => {
  return (
    <div className="card">
      <h3>Partner Program: {item.partner_program}</h3>
      <p>Min Business Miles: {item.min_business_miles ?? "N/A"}</p>
      <p>Min Business Tax: {item.min_business_tax ?? "N/A"}</p>
      <p>Min Economy Miles: {item.min_economy_miles ?? "N/A"}</p>
      <p>Min Economy Tax: {item.min_economy_tax ?? "N/A"}</p>
      <p>Min First Miles: {item.min_first_miles ?? "N/A"}</p>
      <p>Min First Tax: {item.min_first_tax ?? "N/A"}</p>
    </div>
  );
};

export default Card;
