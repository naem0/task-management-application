import React from 'react';

const Taks = ({ myToy, setMyToys, myToys }) => {
    const{_id, title, description, status}=myToy
    const handleDelete = _id => {

        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`https://toy-marketplace-server-pi.vercel.app/my-toy/${_id}`, {
                    method: 'DELETE'
                })
                    .then(res => res.json())
                    .then(data => {
                        console.log(data)
                        if (data.deletedCount > 0) {
                            Swal.fire(
                                'Deleted!',
                                'Your file has been deleted.',
                                'success'
                            )

                            // eslint-disable-next-line react/prop-types
                            const remening = myToys.filter(toy => toy._id !== _id)
                            setMyToys(remening)
                        }

                    })

            }
        })
    }

    return (
        <tr
            data-aos="zoom-in"
            data-aos-easing="ease-out-cubic"
            data-aos-duration="1000">
            <th>
                <button onClick={() => handleDelete(_id)} className="btn btn-circle btn-sm bg-cyan-500 border-0 hover:bg-cyan-600">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
            </th>
            <td>
                <h4 className="font-semibold py-0">{title}</h4>
            
            </td>
            <td> {description}</td>
            <td> {status}</td>
            <th>
                <Link to={`/updat-toy/${_id}`}>
                    <   label className="btn  btn-sm bg-cyan-500 border-0 hover:bg-cyan-600">Edit</label>
                </Link>
            </th>

        </tr>
    );
};

export default Taks;