import * as Blockly from 'blockly/core';
import 'blockly/javascript';

//
// Reverse Parser of Object
//

import listParser from './list.parser'
import magikTimeParser from './magik.time.parser'
import magikDeviceParser from './magik.device.parser'
import magikSpellParser from './magik.spell.parser'
import textParser from './text.parser'
import numberParser from './number.parser'
//import variableParser from './variable.parser'
import magikVariableParser from './magik.variable.parser'
import controlParser from './control.parser'
import magikSmsParser from './magik.sms.parser'

const reverseParser=(wk,obj,linkedConn)=>{
		
    return new Promise(async(resolve, reject) => {

      let bl;
      const idRegex = RegExp('^[a-f\\d]{24}$', 'g');
      
      if (obj==null)
        return;

      if (obj && obj._id){
        if (idRegex.test(obj._id)===false)
          obj._id=this.mongoObjectId();
      }

      if (typeof obj==="string"){
        bl=wk.newBlock('text');
        
        bl.setFieldValue(obj,'TEXT');
        bl.initSvg();
        bl.render();
        
        linkedConn.connect(bl.outputConnection);
        resolve(bl); // return for further linking
      }

      if (typeof obj==="boolean"){
        bl=wk.newBlock('logic_boolean');
        bl.initSvg();
        bl.render();
        
        if (obj===true)
          bl.setFieldValue('TRUE','BOOL');
        else
          bl.setFieldValue('FALSE','BOOL');

        linkedConn.connect(bl.outputConnection);
        resolve(bl); // return for further linking
      }

      if (typeof obj==="number"){
        bl=wk.newBlock('math_number');
        bl.setFieldValue(obj,'NUM');
        
        bl.initSvg();
        bl.render();
        linkedConn.connect(bl.outputConnection);
        resolve(bl);
      }

      if (typeof obj=="object"){
        let nextCon;
        switch(obj.type){
          
          case 'objectLogger':
            bl=wk.newBlock('magik_logger',obj._id);
            bl.initSvg();
            bl.render();
            reverseParser(wk,obj.logItem,bl.getInput("LOGITEM").connection);
            if (linkedConn){
              linkedConn.connect(bl.previousConnection);
            }
            resolve(bl);
          break;

          case 'objectComment':
            bl=wk.newBlock('magik_comment',obj._id);
            bl.initSvg();
            bl.render();
            bl.setFieldValue(obj.args[0],'COMMENT');

            if (linkedConn){
              linkedConn.connect(bl.previousConnection);
            }
            resolve(bl);
          break;
          
          case 'objectEmail':
            bl=wk.newBlock('magik_email_send',obj._id);
            bl.initSvg();
            bl.render();
            reverseParser(wk,obj.args[0],bl.getInput("TO").connection);
            reverseParser(wk,obj.args[1],bl.getInput("SUBJECT").connection);
            reverseParser(wk,obj.args[2],bl.getInput("BODY").connection);
            
            if (linkedConn){
              linkedConn.connect(bl.previousConnection);
            }
            resolve(bl);
          break;

          case 'objectList':
            resolve(await listParser(wk,obj,linkedConn));
          break;
          
          case 'objectTime':
            resolve(await magikTimeParser(wk,obj,linkedConn));
          break;
          
          case 'objectDevice':
            resolve(await magikDeviceParser(wk,obj,linkedConn));
          break;

          case 'objectNumber':
            resolve(await numberParser(wk,obj,linkedConn));
          break;

          case 'objectSpell':
            resolve(await magikSpellParser(wk,obj,linkedConn));
          break;

          case 'objectSms':
            resolve(await magikSmsParser(wk,obj,linkedConn));
          break;

          case 'objectString':
            resolve(await textParser(wk,obj,linkedConn));
          break;

          case 'objectVariable':
            resolve(await magikVariableParser(wk,obj,linkedConn));
          break;

          case 'controlFlow':
            resolve(await controlParser(wk,obj,linkedConn));
          break;
          
          case 'controlIfelse':
            resolve(await controlParser(wk,obj,linkedConn));
          break;
        
          case  'controlComp':
            resolve(await controlParser(wk,obj,linkedConn));
            
          break;

          case  'controlAnd':
            resolve(await controlParser(wk,obj,linkedConn));
          break;

          case 'controlForeach':
             resolve(await controlParser(wk,obj,linkedConn));
          break;
          
          case 'controlLoop':
            resolve(await controlParser(wk,obj,linkedConn));
          break;

          case 'controlWhile':
            resolve(await controlParser(wk,obj,linkedConn));
          break;

          case 'controlNegate':
            resolve(await controlParser(wk,obj,linkedConn));
          break;

          case 'controlNull':
            resolve(await controlParser(wk,obj,linkedConn));
          break;

          default:
            resolve(bl);
          break;

        }
      }
    })
  }
export default reverseParser