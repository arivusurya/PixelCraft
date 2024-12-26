"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useState } from "react";

// List of countries (you can expand this)
const COUNTRIES = [
  "United States",
  "Canada",
  "United Kingdom",
  "India",
  "Australia",
];

export default function Shipping() {
  const [shippingData, setShippingData] = useState({
    country: "",
    firstName: "",
    lastName: "",
    address: "",
    apartment: "",
    city: "",
    state: "",
    pincode: "",
    phoneNumber: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setShippingData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Add your submission logic here
    console.log("Shipping Data:", shippingData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Country */}
        <div className="space-y-2">
          <Label>Country</Label>
          <Select
            value={shippingData.country}
            onValueChange={(value) =>
              setShippingData((prev) => ({
                ...prev,
                country: value,
              }))
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select Country" />
            </SelectTrigger>
            <SelectContent>
              {COUNTRIES.map((country) => (
                <SelectItem key={country} value={country}>
                  {country}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* First Name */}
        <div className="space-y-2">
          <Label>First Name</Label>
          <Input
            name="firstName"
            value={shippingData.firstName}
            onChange={handleChange}
            placeholder="Enter First Name"
          />
        </div>

        {/* Last Name */}
        <div className="space-y-2">
          <Label>Last Name</Label>
          <Input
            name="lastName"
            value={shippingData.lastName}
            onChange={handleChange}
            placeholder="Enter Last Name"
          />
        </div>

        {/* Address */}
        <div className="space-y-2 col-span-full">
          <Label>Address</Label>
          <Input
            name="address"
            value={shippingData.address}
            onChange={handleChange}
            placeholder="Street Address"
          />
        </div>

        {/* Apartment */}
        <div className="space-y-2 col-span-full">
          <Label>Apartment, suite, etc. (Optional)</Label>
          <Input
            name="apartment"
            value={shippingData.apartment}
            onChange={handleChange}
            placeholder="Apartment or unit number"
          />
        </div>

        {/* City, State, Pincode */}
        <div className="grid grid-cols-3 gap-4 col-span-full">
          <div className="space-y-2">
            <Label>City</Label>
            <Input
              name="city"
              value={shippingData.city}
              onChange={handleChange}
              placeholder="City"
            />
          </div>
          <div className="space-y-2">
            <Label>State</Label>
            <Input
              name="state"
              value={shippingData.state}
              onChange={handleChange}
              placeholder="State"
            />
          </div>
          <div className="space-y-2">
            <Label>Pincode</Label>
            <Input
              name="pincode"
              value={shippingData.pincode}
              onChange={handleChange}
              placeholder="Pincode"
            />
          </div>
        </div>

        {/* Phone Number */}
        <div className="space-y-2 col-span-full">
          <Label>Phone Number</Label>
          <Input
            name="phoneNumber"
            value={shippingData.phoneNumber}
            onChange={handleChange}
            type="tel"
            placeholder="Enter Phone Number"
          />
        </div>
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        className="w-full mt-4 bg-red-500 text-white hover:text-red-500 hover:bg-white"
      >
        Continue to Payment
      </Button>
    </form>
  );
}
