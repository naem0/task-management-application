import { useEffect, useState } from "react";
import Taks from "./Taks/Taks";



const AllTask = () => {
    const [myToys, setMyToys] = useState([])
    const url = `https://toy-marketplace-server-pi.vercel.app/my-toy`
    useEffect(() => {
        fetch(url)
            .then(res => res.json())
            .then(data => {
                setMyToys(data)
            })
    }, [url])
    return (
        <div>
            <button>Taks</button>
            <div className="overflow-x-auto w-full">
                <table className="table w-5/6 mx-auto">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>
                                Delete
                            </th>
                            <th>Photo</th>
                            <th>Toy Name</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Edit</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            myToys.map(myToy => <Taks
                                key={myToy._id}
                                myToy={myToy}
                                myToys={myToys}
                                setMyToys={setMyToys}
                            ></Taks>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllTask;