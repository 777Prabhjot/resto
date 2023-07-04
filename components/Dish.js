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
import { Box, Modal, TextField } from "@mui/material";

const Dish = ({image, name, description, price }) => {
  const [quantity, setQuantity] = useState(1);
  const [totalPrice, setTotalPrice] = useState(price);
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
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
      price: Number(totalPrice),
      quantity: Number(quantity),
    });
  };

  const handleChange = (e) => {
    if(Number(e.target.value) !== Number(price)){
      setTotalPrice(Number(price) + Number(e.target.value));
    }else{
      setTotalPrice(price);
    }
  }

  useEffect(() => {
    if (mutation.isError) {
      toast.error(mutation.error?.response?.data?.message);
    }
    if (mutation.isSuccess) {
      toast.success("Order placed successfully");
    }
  }, [mutation.isError, mutation.isSuccess]);

  return (
    <>
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
      <CardActions className="flex flex-col items-between px-5">
        <div className="flex justify-between w-full mb-3">
        <Button size="small" className="cursor-text text-lg">
          ₹{totalPrice}
        </Button>
        <Button variant="contained" className="bg-blue-400" onClick={handleOpen}>ADD</Button>
        </div>
        <div>
          <select
            className="me-2 border-[1px] p-1 border-[#ed6c02] cursor-pointer"
            onChange={(e) => {
              setQuantity(e.target.value)
            }}
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

      <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          className='flex justify-center items-center'
        >
          <Box className='bg-white p-5 flex flex-col w-[30%]'>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              {name}
            </Typography>
            <span className="font-bold">₹{totalPrice}</span>
            <div className="mt-4">
              <div className="flex justify-between">
              <h3 className="font-bold">Choice</h3>
              <h3>Choose one</h3>
              </div>

              <div className="flex justify-between mt-3">
                <div>
                <input type="radio" name="addon" value={price} defaultChecked onChange={handleChange} id="radio1"/>
                <label className="ms-3" for='radio1'>Small</label>
                </div>
                <span>₹{price}</span>
              </div>
              <div className="flex justify-between mt-3">
                <div>
                <input type="radio" name="addon" value={50} onChange={handleChange} id="radio2"/>
                <label className="ms-3" for='radio2'>Medium</label>
                </div>
                <span>+₹50</span>
              </div>
              <div className="flex justify-between mt-3">
                <div>
                <input type="radio" name="addon" value={100} onChange={handleChange} id="radio3"/>
                <label className="ms-3" for='radio3'>Large</label>
                </div>
                <span>+₹100</span>
              </div>
              <Button variant="contained" className="bg-blue-400 w-full mt-5" onClick={handleClose}>ADD</Button>
            </div>
          </Box>
        </Modal>
    </>
  );
};

export default Dish;
