const express=require('express')
const router=express.Router()
const {getAllHomesAdmin,putStatusHomeAdmin}=require('../Controllers/admin/postControllerAdmin')
const {userCounter,propertyCounter,viewCounter,messageCounter}=require('../Controllers/admin/adminStat')
const {authProtectAdmin}=require('../middleware/authMiddleware')
const {adminLogin,adminRegister,adminIsLoggedIn}=require('../Controllers/admin/adminControllers')




// router.delete('/property/delete', DeleteAllHomes)
router.get('/usercounter', authProtectAdmin,userCounter)
router.get('/propertycounter', authProtectAdmin,propertyCounter)
router.get('/viewCounter', authProtectAdmin,viewCounter)
router.get('/messagecounter', authProtectAdmin,messageCounter)
router.post('/property/get', authProtectAdmin,getAllHomesAdmin)
router.post('/login', adminLogin)
router.post('/signup', authProtectAdmin,adminRegister)
router.post('/loggedin', authProtectAdmin,adminIsLoggedIn)
router.put('/property/update',authProtectAdmin, putStatusHomeAdmin)

module.exports=router