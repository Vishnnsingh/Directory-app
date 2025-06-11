import React, { useContext, useState } from 'react'
import styles from './MainSection.module.css'
import InputSection from '../InputSection/InputSection';
import { UserContext } from '../App';
import { MdDelete } from "react-icons/md";
import Retrieve from '../Retrieve/Retrieve';

const MainSection = () => {
    const[showInput , setShowInput] = useState(false);
   const ctx = useContext(UserContext);
   let nav = ctx.Navigator;
const handleAdd = () =>{
    setShowInput(true);
}

const handleDelete =(id) =>{
    console.log("id" , id);
    
    let filtered = ctx.data.filter((ele, i) => i != id);
    console.log("filterd :" , filtered );
    
    ctx.setData([
        ...filtered
    ])

    let userDetails = JSON.parse(  localStorage.getItem("userDetails") )
    let newArr = userDetails.filter((ele,i) =>i != id)
    localStorage.setItem("userDetails" , JSON.stringify(newArr))


}

  return (
 <>
  {
    ctx.Navigator ? <Retrieve /> : 
    <div className={styles.main_con}>
    <h2>Add Person</h2>
 <table>
  <thead>
    <tr>
      <th>Name</th>
      <th>Date of Birth</th>
      <th>Aadhar Number</th>
      <th>Mobile Number</th>
      <th>Age</th>
      <th>Actions</th>
    </tr>
  </thead>
  <tbody>
    {ctx.data.map((ele, i) => (
      <tr key={i}>
        <td>{ele.name}</td>
        <td>{ele.dob}</td>
        <td>{ele.aadhar}</td>
        <td>{ele.mob}</td>
        <td>{ele.age}</td>
        <td className={styles.deleteTD}>
          <MdDelete
            onClick={() => handleDelete(i)}
            className={styles.delete}
            role="button"
          />
        </td>
      </tr>
    ))}
  </tbody>
</table>

     {
        showInput ? <InputSection showInput={showInput} setShowInput={setShowInput} /> : null
     }
     <button className={styles.add} onClick={handleAdd}>Add</button>
</div>
  }
 </>
  )
}

export default MainSection