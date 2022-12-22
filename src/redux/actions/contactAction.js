import { API } from '../../backend';

export const contactUs = (data) => async (dispatch)=>  {
 
        const response = await fetch(`${API}contact/contactUs`, {
          method: "POST",
          body: JSON.stringify(data),
          headers: { "Content-Type": "application/json",
       },
        });

        const res = await response.json();

        // //console.log(res)
  }

  export const bulkOrder = (data) => async (dispatch)=>  {
    //console.log(data)

   
 
        const response = await fetch(`${API}contact/bulkOrder`, {
          method: "POST",
          body: JSON.stringify(data),
          headers: { "Content-Type": "application/json",
       },
        });

        const res = await response.json();

  }