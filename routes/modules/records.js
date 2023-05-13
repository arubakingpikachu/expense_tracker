const express=require('express')
const Record=require('../../models/record')// 引入Record model
const Category = require('../../models/category')
const router=express.Router()

router.get('/new',async (req, res) => {
  const category=await Category.find({}).lean()
  res.render('new',{category})
}) //new的頁面

router.post('/',async (req,res)=>{
  
  const {name,amount,date,category}=req.body
  
  const userId=req.user._id
 
  const refCate=await Category.findOne({categoryName:category})//找出要新增的類別
  
  const categoryId=refCate._id
 
  await Record.create({name,amount,date,categoryId,userId})//創造新資料，categoryId用refCate的_is
  res.redirect('/')
})//new POST

router.get('/:id/edit',async (req,res)=>{
  const userId=req.user._id//登入使用者的id
  const record_id=req.params.id//條目id
  try{
  const record=await Record.findOne({_id:record_id,userId}).lean()//取出該筆支出完整的紀錄
  
  const cate_id=record.categoryId//該筆支出的類別id
  const cate=await Category.findOne({_id:cate_id}).lean()
  const cateName=cate.categoryName

  const category=await Category.find({}).lean()//整組類別選項

  record.date=record.date.toLocaleDateString('zh-TW',{  year:'numeric',month:'numeric',
  day: 'numeric',})
  
  res.render('edit',{record,cateName,category})
  }catch{console.log('error')}
   
})//get EDIT




router.put('/:id',async (req,res)=>{
  const userId = req.user._id
  const record_id=req.params.id
  const {name,amount,date,category}=req.body
  try{
    const refCate=await Category.findOne({categoryName:category})
    const categoryId=refCate._id
    const record=await Record.findOne({_id:record_id,userId})
    
    record.name=name
    record.amount=amount
    record.date=date
    record.categoryId=categoryId
    await record.save()
    res.redirect('/')
  }catch{console.log('error')}
  
})


router.delete('/:id',async (req,res)=>{
  const userId = req.user._id
  const _id=req.params.id

  try{
  const record=await Record.findOne({ _id, userId })
  record.remove()
  res.redirect('/')}catch{console.log('error')}  
  
})//delete



module.exports=router