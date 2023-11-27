import * as React from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";
import { useEffect } from "react";
import Loading from "@/Common/Loading";
import { ToastContainer, toast } from "react-toastify";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    "& .MuiDialogContent-root": {
        padding: theme.spacing(2),
        width: "600px", // Set your desired minWidth
        minHeight: "300px", // Set your desired minHeight
        maxHeight: "500px",
        overFlow: "auto",
    },
    "& .MuiDialogActions-root": {
        padding: theme.spacing(1),
    },
}));

export default function LocationModal(props) {
    const [allCheck, setAllCheck] = useState(false);
    const [cargoData, setCargoData] = useState([]);
    const [allLocation, setAllLocation] = useState("");
    const [allShelfNo, setAllShelfNo] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        let cargoArr = JSON.parse(JSON.stringify(props.categories));
        if (cargoArr.length > 0) {
            const sameLocation = getAllLocationStatus(cargoArr); // check all location is same
            const sameShelfNo = getAllShelfNoStatus(cargoArr); // check all shelf no is same
            if (sameLocation && sameShelfNo) {
                setAllCheck(true);
                setAllLocation(cargoArr[0].category_name.location);
                setAllShelfNo(cargoArr[0].category_name.shelf_no);
                setCargoData(cargoArr);
            } else {
                setCargoData(
                    cargoArr.map((d) => {
                        if (d.category_name.location || d.shelf_no) {
                            d.isChecked = true;
                        }
                        return d;
                    })
                );
            }
        }
    }, [props.categories]);

    function getAllLocationStatus(dataArray) {
        const firstCategoryLocation = dataArray[0].category_name.location;
        return dataArray.every(
            (item) => item.category_name.location === firstCategoryLocation
        );
    }

    function getAllShelfNoStatus(dataArray) {
        const firstCategoryShelfNo = dataArray[0].category_name.shelf_no;
        return dataArray.every(
            (item) => item.category_name.shelf_no === firstCategoryShelfNo
        );
    }

    const cargoOnChage = (id) => {
        let data = cargoData.map((data) => {
            if (data.item_category_id == id) {
                data.isChecked = !data.isChecked;
            }
            return data;
        });
        setCargoData(data);
    };

    const saveClick = () => {
        props.onClose();
        let itemsArr = [];

        cargoData.map((d) => {
            itemsArr.push({
                category_id: d.id,
                item_category_id: d.item_category_id,
                location: allCheck
                    ? allLocation
                    : d.category_name.location ?? "",
                shelf_no: allCheck
                    ? allShelfNo
                    : d.category_name.shelf_no ?? "",
            });
        });

        props.locationSave(itemsArr);
    };

    const subLocationChange = (event, id) => {
        setCargoData(
            cargoData.map((d) => {
                if (d.category_name.id === id) {
                    d.category_name.location = event.target.value;
                }
                return d;
            })
        );
    };

    const subShelfNoChange = (event, id) => {
        setCargoData(
            cargoData.map((d) => {
                if (d.category_name.id === id) {
                    d.category_name.shelf_no = event.target.value;
                }
                return d;
            })
        );
    };

    const allLocationChange = (e) => {
        setAllLocation(e.target.value);
    };

    const allShelfNoChange = (e) => {
        setAllShelfNo(e.target.value);
    };

    return (
        <React.Fragment>
            <Loading start={loading} />
            <BootstrapDialog
                onClose={props.onClose}
                aria-labelledby="customized-dialog-title"
                open={props.show}
            >
                <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                    Location{" "}
                </DialogTitle>
                <IconButton
                    aria-label="close"
                    onClick={props.onClose}
                    sx={{
                        position: "absolute",
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
                <DialogContent dividers>
                    <input
                        className=" dark:bg-gray-400 focus:ring cursor-pointer focus:ring-blue-100 focus:ring-opacity-50 focus:outline-none"
                        type="checkbox"
                        id="all-items"
                        onChange={() => {
                            setAllCheck(!allCheck);
                            setCargoData(
                                cargoData.map((d) => {
                                    if (
                                        d.category_name.location ||
                                        d.shelf_no
                                    ) {
                                        d.isChecked = true;
                                    }
                                    return d;
                                })
                            );
                        }}
                        checked={allCheck}
                    />
                    <label htmlFor="all-items" className="ms-2 cursor-pointer">
                        All Categories
                    </label>
                    <div
                        className={
                            allCheck
                                ? "cursor-not-allowed bg-gray-300 rounded"
                                : ""
                        }
                    >
                        {cargoData.length > 0 &&
                            cargoData.map((data, index) => {
                                return (
                                    <div
                                        key={data.id}
                                        className={
                                            !data.isChecked
                                                ? "ml-6 mt-3 p-3 rounded"
                                                : "ml-6 mt-3 bg-slate-300 p-3 rounded"
                                        }
                                    >
                                        <input
                                            className={
                                                allCheck
                                                    ? " dark:bg-gray-400 focus:ring focus:ring-blue-100 focus:ring-opacity-50 focus:outline-none cursor-not-allowed"
                                                    : " dark:bg-gray-400 focus:ring cursor-pointer focus:ring-blue-100 focus:ring-opacity-50 focus:outline-none "
                                            }
                                            type="checkbox"
                                            id={data.category_name.id}
                                            value={data.category_name.id}
                                            onChange={function () {
                                                cargoOnChage(
                                                    data.category_name.id
                                                );
                                            }}
                                            checked={
                                                allCheck === true
                                                    ? true
                                                    : data.isChecked ?? false
                                            }
                                            disabled={allCheck ? true : false}
                                        />
                                        <label
                                            htmlFor={data.category_name.id}
                                            className={
                                                allCheck
                                                    ? "ms-2 cursor-not-allowed"
                                                    : "ms-2 cursor-pointer"
                                            }
                                        >
                                            {data.category_name.name}
                                        </label>
                                        {data.isChecked && !allCheck && (
                                            <div className="flex justify-center gap-2 mt-3">
                                                <div>
                                                    <label
                                                        htmlFor=""
                                                        className="mr-1"
                                                    >
                                                        Location:
                                                    </label>
                                                    <input
                                                        className="dark:text-black dark:bg-gray-400  mt-4 border-b-indigo-400 border-t-0 border-s-0 border-e-0 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50"
                                                        type="text"
                                                        name=""
                                                        id=""
                                                        value={
                                                            data.category_name
                                                                .location
                                                        }
                                                        onChange={(e) =>
                                                            subLocationChange(
                                                                e,
                                                                data
                                                                    .category_name
                                                                    .id
                                                            )
                                                        }
                                                    />
                                                </div>
                                                <div>
                                                    <label
                                                        htmlFor=""
                                                        className="mr-1"
                                                    >
                                                        Shelf No:
                                                    </label>
                                                    <input
                                                        className="dark:text-black dark:bg-gray-400  mt-4 border-b-indigo-400 border-t-0 border-s-0 border-e-0 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50"
                                                        type="text"
                                                        name=""
                                                        id=""
                                                        value={
                                                            data.category_name
                                                                .shelf_no
                                                        }
                                                        onChange={(e) =>
                                                            subShelfNoChange(
                                                                e,
                                                                data
                                                                    .category_name
                                                                    .id
                                                            )
                                                        }
                                                    />
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                    </div>
                    {allCheck && (
                        <div className="flex justify-center gap-2 mt-[30px]">
                            <div>
                                <label htmlFor="" className="mr-1">
                                    Location:
                                </label>
                                <input
                                    className="dark:text-black dark:bg-gray-400  mt-4 border-b-indigo-400 border-t-0 border-s-0 border-e-0 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50"
                                    type="text"
                                    name=""
                                    id=""
                                    value={allLocation}
                                    onChange={allLocationChange}
                                />
                            </div>
                            <div>
                                <label htmlFor="" className="mr-1">
                                    Shelf No:
                                </label>
                                <input
                                    className="dark:text-black dark:bg-gray-400  mt-4 border-b-indigo-400 border-t-0 border-s-0 border-e-0 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50"
                                    type="text"
                                    name=""
                                    id=""
                                    value={allShelfNo}
                                    onChange={allShelfNoChange}
                                />
                            </div>
                        </div>
                    )}
                </DialogContent>
                <DialogActions>
                    <button
                        onClick={() => saveClick()}
                        type="submit"
                        className="bg-indigo-800 hover:bg-indigo-900 text-white font-semibold px-4 py-2 rounded focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50 font-sans mr-1"
                    >
                        Save Changes
                    </button>
                </DialogActions>
            </BootstrapDialog>
        </React.Fragment>
    );
}
