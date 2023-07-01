"use client";
import React from "react";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import { getAllOrders } from "@/services/dishs";
import { Box, Card, CardContent, Typography } from "@mui/material";

const queryClient = new QueryClient();

const page = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Order />
    </QueryClientProvider>
  );
};

const Order = () => {
  const orders = useQuery({ queryKey: ["todos"], queryFn: getAllOrders });

  return (
    <div className="w-full flex flex-col items-center">
      <h1 className="text-2xl font-bold mt-4">My Orders</h1>

      {orders?.data?.length ? (
        <div>
          {orders?.data?.map((item) => {
            return (
              <Card className="my-4" sx={{ display: "flex" }} key={item?._id}>
                <Box sx={{ display: "flex" }}>
                  <CardContent sx={{ flex: "1 0 auto" }}>
                    <Typography component="div" variant="h5">
                      {item?.name}
                    </Typography>
                    <Typography
                      variant="subtitle1"
                      color="text.secondary"
                      component="div"
                    >
                      Quantity: {item?.quantity}
                    </Typography>
                    <Typography
                      variant="subtitle1"
                      className="text-blue-400"
                      component="div"
                    >
                      Price: ₹{item?.price}
                    </Typography>
                  </CardContent>
                  <Box sx={{ display: "flex", alignItems: "center", pl: 1 }}>
                    <img
                      className="w-[100px] h-[100px]"
                      src={item?.image}
                      alt="image"
                    />
                  </Box>
                </Box>
              </Card>
            );
          })}
        </div>
      ) : (
        <div className="w-full h-[80vh] flex justify-center items-center">
          No Order Found
        </div>
      )}
    </div>
  );
};

export default page;
