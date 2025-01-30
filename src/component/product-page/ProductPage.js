import { useState } from "react";
import { Products } from "../../data.js";

export default function ProductPage() {
  const [productList, setProductList] = useState(Products);
  const [addCartProducts, setAddCardProducts] = useState([]);

  function handleAddToCard(id) {
    let addProduct = productList?.filter((item) => item.id === id);
    let newProductList = productList?.map((item) => {
      if (item?.id === id) {
        return {
          ...item,
          showItem: true,
        };
      } else return item;
    });
    setProductList(newProductList);

    setAddCardProducts((prev) => [...prev, addProduct]);
  }

  // function for remove item
  function onHandleRemove(id) {
    let newProductList = productList?.map((item) => {
      if (item?.id === id) {
        return {
          ...item,
          initalVal: item?.initalVal === 1 ? 1 : item.initalVal - 1,
          showItem: item?.initialVal === 1 ? true : false,
        };
      } else {
        return item;
      }
    });

    setProductList(newProductList);
  }

  function onHandleAdd(id) {
    let newProductList = productList?.map((item) => {
      if (item?.id === id) {
        return {
          ...item,
          initalVal:
            item.initalVal === item.quantity
              ? item.quantity
              : item.initalVal + 1,
        };
      } else {
        return item;
      }
    });
    setProductList(newProductList);
  }

  console.log("productItem", productList);
  console.log("add", addCartProducts);

  return (
    <div>
      {productList.map((item) => (
        <div key={item.id}>
          <div
            style={{
              border: "1px solid black",
              margin: "20px",
              padding: "30px",
            }}
          >
            <div> {item?.image} </div>
            <div>price: {item?.price} </div>
            <div>description:{item?.description}</div>
            <div>review:{item?.review}</div>
            {!item?.showItem ? (
              <button onClick={() => handleAddToCard(item?.id)}>
                {" "}
                add to card
              </button>
            ) : (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <button onClick={() => onHandleRemove(item.id)}>-</button>
                <div>{item?.initalVal} </div>
                <button onClick={() => onHandleAdd(item.id)}>+</button>
              </div>
            )}
          </div>
        </div>
      ))}

      <div>
        <div>ADD Product</div>

        {addCartProducts?.map((item) => (
          <div>{item.description} </div>
        ))}
      </div>
    </div>
  );
}
