"use client";
import React, { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { placeOrder } from "@/services/dishs";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { ToastContainer, toast } from "react-toastify";

const Dish = ({image, name, description, price }) => {
  const [quantity, setQuantity] = useState(1);

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: placeOrder,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["order"] });
    },
  });

  const handleSubmit = () => {
    mutation.mutate({
      name,
      image,
      price,
      quantity: Number(quantity),
    });
  };

  useEffect(() => {
    if (mutation.isError) {
      toast.error(mutation.error?.response?.data?.message);
    }
    if (mutation.isSuccess) {
      toast.success("Order placed successfully");
    }
  }, [mutation.isError, mutation.isSuccess]);

  return (
    <Card sx={{ maxWidth: 345 }}>
      <ToastContainer
        theme="colored"
        autoClose={2000}
        limit={1}
        className="z-50"
      />
      <CardMedia sx={{ height: 140 }} image={image} title="green igana" />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
      <CardActions className="flex justify-between px-5">
        <Button size="small" className="cursor-text text-lg">
          ₹{price}
        </Button>
        <div>
          <select
            className="me-2 border-[1px] p-1 border-[#ed6c02] cursor-pointer"
            onChange={(e) => setQuantity(e.target.value)}
          >
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
            <option value={5}>5</option>
          </select>
          <Button
            variant="outlined"
            color="warning"
            size="small"
            onClick={handleSubmit}
          >
            Place Order
          </Button>
        </div>
      </CardActions>
    </Card>
  );
};

export default Dish;
