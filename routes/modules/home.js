const express = require('express')
const Record=require('../../models/record')
const Category = require('../../models/category')
const router = express.Router()


router.get('/',async (req, res) => {
  const userId = req.user._id
  let totalAmount=0
  
  try{
   const record=await Record.find({userId}).lean()
   

   for(let item of record){
      const perCate=await Category.findOne({_id:item.categoryId})
      item.icon=perCate.categoryIcon
      totalAmount+=item.amount
      item.date=new Date(item.date).toLocaleDateString('zh-TW',{  year:'numeric',month:'numeric',
      day: 'numeric',})}
     
   res.render('index',{record,totalAmount})
 } catch{console.log('error')} 

})// 純瀏覽及總金額

router.get('/:category',async (req,res)=>{
   const reqCate=req.params.category//req傳送過來的分類
   let totalAmount=0

   const filterCate=await Category.findOne({categoryName:reqCate}).lean()//在model找出對應需求的物件  
   const filterCateId=filterCate._id//找出物件的_id
   const record=await Record.find({categoryId:filterCateId}).lean()//篩選出符合id的record

   for(let item of record){
      const perCate=await Category.findOne({_id:item.categoryId})
      item.icon=perCate.categoryIcon
      totalAmount+=item.amount
      item.date=new Date(item.date).toLocaleDateString('zh-TW',{  year:'numeric',month:'numeric',
      day: 'numeric',})
   }//總金額

   res.render('index',{record,totalAmount})




})

module.exports=router