"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { useState } from "react";

interface FormData {
  origin: string;
  destination: string;
  cabin: string;
  startDate: string;
}

interface ApiResponse {
  data: Array<{
    min_business_miles: number | null;
    min_business_tax: number | null;
    min_economy_miles: number | null;
    min_economy_tax: number | null;
    min_first_miles: number | null;
    min_first_tax: number | null;
    partner_program: string;
  }>;
}

const partnerImages: { [key: string]: string } = {
  "Qatar Airways": "/qatar.png",
  "American Airlines": "/American airlines.jpeg",
  "Air Canada": "/aircanada.jpeg",
  "United Airlines": "/united airlines.png",
  "KLM": "/klm.png",
  "Qantas": "/quantas.png",
  "Etihad Airways": "/etihad.png",
  "Alaska Airlines": "/alaska.png",
  "LifeMiles": "/lifemiles.png",
};

export default function Home() {
  const { register, handleSubmit } = useForm<FormData>();
  const [result, setResult] = useState<ApiResponse | null>(null);
  const [fail, setFail] = useState<string>("");
  const [formStartDate, setFormStartDate] = useState<string>("");

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    const headers: HeadersInit = {
      accept: "application/json, text/plain, */*",
      "accept-language": "en-US,en;q=0.9,hi;q=0.8",
      "cache-control": "no-cache",
      "content-type": "application/json",
      "user-agent":
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36",
    };

    const json_data = {
      origin: data.origin,
      destination: data.destination,
      partnerPrograms: [
        "Air Canada",
        "United Airlines",
        "KLM",
        "Qantas",
        "American Airlines",
        "Etihad Airways",
        "Alaska Airlines",
        "Qatar Airways",
        "LifeMiles",
      ],
      stops: 2,
      departureTimeFrom: data.startDate,
      departureTimeTo: "2024-10-07T00:00:00Z",
      isOldData: false,
      limit: 302,
      offset: 0,
      cabinSelection: [data.cabin],
      date: new Date().toISOString(),
    };

    try {
      const response = await fetch("https://cardgpt.in/apitest", {
        method: "POST",
        headers: headers,
        body: JSON.stringify(json_data),
      });
      const result: ApiResponse = await response.json();
      setFormStartDate(data.startDate);
      setResult(result);
    } catch (error) {
      setFail("Try another route");
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-xs space-y-4"
      >
        <select
          {...register("origin", { required: true })}
          className="select select-bordered w-full"
        >
          <option value="">Select origin...</option>
          <option value="JFK">JFK</option>
          <option value="DEL">DEL</option>
          <option value="SYD">SYD</option>
          <option value="BOM">BOM</option>
          <option value="BNE">BNE</option>
          <option value="BLR">BLR</option>
        </select>

        <select
          {...register("destination", { required: true })}
          className="select select-bordered w-full"
        >
          <option value="">Select destination...</option>
          <option value="JFK">JFK</option>
          <option value="DEL">DEL</option>
          <option value="SYD">SYD</option>
          <option value="LHR">LHR</option>
          <option value="CDG">CDG</option>
          <option value="DOH">DOH</option>
          <option value="SIN">SIN</option>
        </select>

        <select
          {...register("cabin", { required: true })}
          className="select select-bordered w-full"
        >
          <option value="">Select cabin...</option>
          <option value="Economy">Economy</option>
          <option value="Business">Business</option>
          <option value="First">First</option>
        </select>

        <input
          type="date"
          {...register("startDate", { required: true })}
          className="input input-bordered w-full"
          placeholder="Start Date"
        />

        <input
          type="submit"
          value="Search"
          className="btn btn-primary w-full"
        />
      </form>

      {result && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8 place-items-center">
          <h2 className="text-2xl font-bold col-span-full mb-4">
            Available Flights
          </h2>
          {result.data.map((item, index) => (
            <div key={index} className="card bg-base-100 w-96 shadow-xl">
              <figure className="px-10 pt-10">
                <img
                  src={partnerImages[item.partner_program]}
                  alt="Flight"
                  className="rounded-xl"
                />
              </figure>
              <div className="card-body items-center text-center">
                <h3 className="card-title">{item.partner_program}</h3>
                <p> {formStartDate}</p>
                <div>
                  <p className="text-2xl">
                    {item.min_business_miles ?? "N/A"}{" "}
                    {item.min_business_miles != null && (
                      <span className="text-sm">
                        ${item.min_business_tax ?? "N/A"}
                      </span>
                    )}
                  </p>
                  <p>Min Business Miles</p>
                </div>

                <div>
                  <p className="text-2xl">
                    {item.min_first_miles ?? "N/A"}{" "}
                    {item.min_first_miles != null && (
                      <span className="text-sm">
                        ${item.min_first_tax ?? "N/A"}
                      </span>
                    )}
                  </p>
                  <p>Min First  Miles</p>
                </div>

                <div>
                  <p className="text-2xl">
                    {item.min_economy_miles ?? "N/A"}{" "}
                    {item.min_economy_miles != null && (
                      <span className="text-sm">
                        ${item.min_economy_tax ?? "N/A"}
                      </span>
                    )}
                  </p>
                  <p>Min Economy  Miles</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {fail && <p> {fail}</p>}
    </main>
  );
}
