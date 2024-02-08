import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import BuySlider from '../../../Buy/BuyDetail/BuySlider/BuySlider';
import BuyMap from '../../../Buy/BuyDetail/BuyMap/BuyMap';

import locationColorImage from '../../../../../assets/icons/home/map.svg'
import RentDetailsNumber from './RentDetailsNumber/RentDetailsNumber';
import BuyDescription from '../../../Buy/BuyDetail/BuyDescription/BuyDescription';
import ContactButtons from '../../../Buy/BuyDetail/ContactButtons/ContactButtons';


const RentDetail = () => {

    const {id}=useParams()
    // console.log("Comming id:",id);


    const [allData,setAllData]=useState("")
    useEffect(()=>{
        fetch(`http://154.26.135.41:3800/api/tolet/post?post_id=${id}`)
        .then(res=>res.json())
        .then(data=>setAllData(data))
    },[id])

     console.log("Basa: ",allData);
   
     const {uid,post_id,balcony,bath,bed,category,click,description,dining,drawing,facing,fasalitis,floornumber,garagetype,geolat,geolon,image1,image2,image3,image4,image5,image6,image7,
        image8,image9,image10,image11,image12,kitchen,location,locationfull,mentenance,payment,phone,propertyname,rent,rentfrom,roomsize,shortaddress,time,top_ads,wapp}=allData


      //Time Start
      const [difference, setDifference] = useState('');
      useEffect(() => {
          const calculateDifference = () => {
          const currentTime = new Date();
          const postedTime = new Date(time);
          const differenceInMilliseconds = currentTime - postedTime;
          const seconds = Math.floor(differenceInMilliseconds / 1000);
          const minutes = Math.floor(seconds / 60);
          const hours = Math.floor(minutes / 60);
          const days = Math.floor(hours / 24);
    
          if (days > 0) {
            setDifference(`${days} day${days !== 1 ? 's' : ''} ago`);
          } else if (hours > 0) {
            setDifference(`${hours} hour${hours !== 1 ? 's' : ''} ago`);
          } else if (minutes > 0) {
            setDifference(`${minutes} minute${minutes !== 1 ? 's' : ''} ago`);
          } else {
            setDifference(`Just now`);
          }
        };
    
        calculateDifference();
    
        // Refresh difference every minute
        const interval = setInterval(calculateDifference, 60000);
    
        return () => clearInterval(interval);
      }, [time]);
       ////Time End

    //    console.log("Kochu Time: ",time);
    //    console.log("Kochu Different: ",difference);   

      ///Set Image for Slider Start
      let imagesForSlider=[];
      if(image1){
         imagesForSlider.push(image1)
      }
     if(image2){
         imagesForSlider.push(image2)
      }
     if(image3){
         imagesForSlider.push(image3)
      }
     if(image4){
         imagesForSlider.push(image4)
      }
      if(image5){
         imagesForSlider.push(image5)
      }
      if(image6){
         imagesForSlider.push(image6)
      }
      if(image7){
         imagesForSlider.push(image7)
      }
      if(image8){
         imagesForSlider.push(image8)
      }
      if(image9){
         imagesForSlider.push(image9)
      }
      if(image10){
         imagesForSlider.push(image10)
      }
      if(image11){
         imagesForSlider.push(image11)
      }
      if(image12){
         imagesForSlider.push(image12)
      }

    //   console.log("All Image: ",imagesForSlider);
    //   console.log("Type of Images: ",typeof(imagesForSlider));
     //  console.log("Length of Image: ",imagesForSlider.length);

     ///Set Image for Slider End


      ///Map Start
    
    let defaultProps = {
        center: {
          lat: 0,
          lng: 0
        },
        zoom: 11
    };

    if(geolat){
        defaultProps = {
            center: {
              lat: parseFloat(geolat),
              lng: parseFloat(geolon)
            },
            zoom: 11
        };
    }
    else{
        return <span className="loading loading-spinner text-error"></span>;
    }

    ///Map End


     ////Sell From start
     let rentFrom_=new Date(rentfrom);
     const options = {
         day: 'numeric',
         month: 'long', // "long" specifies full month name
         year: 'numeric'
       };
       rentFrom_ = rentFrom_.toLocaleDateString('en-US', options);
       ////Sell From start



      ///////Important feature start
      let allDetails=[]

      if(propertyname){
        allDetails.push({
            itemName:'Property Name',
            itemNumber: propertyname
            
         })
      }
    
      if(category){
         allDetails.push({
            itemName:'Property Type',
            itemNumber: category
            
         })
      }
      if(dining){
        allDetails.push({
            itemName:'Dining',
            itemNumber: dining
            
         })
      }

      if(drawing){
        allDetails.push({
            itemName:'Drawing',
            itemNumber: drawing
            
         })
      }

      if(kitchen){
        allDetails.push({
            itemName:'Kitchen',
            itemNumber: kitchen
            
         })
      }
      if(balcony){
        allDetails.push({
            itemName:'Balcony',
            itemNumber: balcony
            
         })
      }
      if(floornumber){
        allDetails.push({
            itemName:'Floor',
            itemNumber: floornumber
            
         })
      }
      if(facing){
        allDetails.push({
            itemName:'Facing',
            itemNumber: facing
            
         })
      }

      if(rentfrom){
        allDetails.push({
            itemName:'Rent From',
            itemNumber: rentFrom_
            
         })
      }

      if(fasalitis){
        allDetails.push({
            itemName:'Facilities',
            itemNumber: fasalitis
            
         })
      }

      if(mentenance){
        allDetails.push({
            itemName:'Maintenance',
            itemNumber: mentenance
            
         })
      }
      if(shortaddress){
        allDetails.push({
            itemName:'Short Address',
            itemNumber: shortaddress
            
         })
      }
     
  //    console.log(" Important: ",bedBathImportant);
      ///Bed Bath end

      console.log("Fasalities Type: ",typeof(fasalitis));


    if (!allData) {
        if(!defaultProps){
            return <span className="loading loading-spinner text-error"></span>;
        }
       
    }

   
    return (
        <div>
            Rent Detail: {id}
            <div className='flex gap-4 w-full h-[500px] '>
                    <div className='w-[60%] h-full'>
                        {/* <img className='w-full h-[450px]'  src={`data:image/png;base64,${image1}`} alt="" /> */}
                        <BuySlider imagesForSlider={imagesForSlider}></BuySlider>
                    </div>
                <div className='w-[40%] h-full flex flex-col bg-green-600 '>
                    <div className='h-full'>
                        <BuyMap geolat={geolat} geolon={geolon} ></BuyMap>
                    </div>
                </div>
            </div>
            {/* <TkAndShare price={price}></TkAndShare> */}

            <div className='my-4 flex justify-between'>
                <div className='text-2xl font-bold'>৳ {rent}</div>
                <div>
                    <ContactButtons phone={phone} wapp={wapp}></ContactButtons>
                </div>
            </div>

            <div className='w-full h-[1px] bg-black my-4'></div>

            <div className='flex justify-between items-center'>
                <div className='my-4 flex items-center gap-10'>
                    <div className='w-[50px] h-[50px] border-2 rounded-full p-2 border-blue-500 '>
                        <img className='' src={locationColorImage} alt="" />
                    </div>
                    <p className='text-xl font-bold'>{location}</p>
                </div>
                <div className='font-bold text-xl'>
                    {difference}
                </div>
            </div>



            <section>
            <h1 className='text-xl'>Details</h1>
            <div className='border-2 border-yellow-500 w-[600px] p-5 rounded-md'>
               {
                 allDetails.map((ad,idx)=> <RentDetailsNumber key={idx}  ad={ad} ></RentDetailsNumber> )
               }
            </div>
            </section>

            <div>
                <BuyDescription description={description}></BuyDescription>
            </div>
           


        </div>
    );
};

export default RentDetail;