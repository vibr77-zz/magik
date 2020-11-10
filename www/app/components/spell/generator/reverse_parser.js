
import * as Blockly from 'blockly/core';
import 'blockly/javascript';

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
        if (obj===true)
          bl.setFieldValue('TRUE','BOOL');
        else
          bl.setFieldValue('FALSE','BOOL');

        bl.initSvg();
        bl.render();
        
        linkedConn.connect(bl.outputConnection);
     
        resolve(bl); // return for further linking
      }

      if (typeof obj==="number"){

        bl=wk.newBlock('math_number');
        bl.setFieldValue(obj,'NUM');
        
        bl.initSvg();
        bl.render();
        linkedConn.connect(bl.outputConnection);
        resolve(bl); // return for further linking
      }

      if (typeof obj=="object"){
        let nextCon;
        switch(obj.type){

          case 'objectList':
            if (obj.methodName=="emptyList"){
              bl=wk.newBlock('lists_create_empty',obj._id);
              bl.initSvg();
              bl.render();
              if (linkedConn){
                linkedConn.connect(bl.outputConnection);
              }
              resolve(bl);
            }else if(obj.methodName=="listWith"){
              bl=wk.newBlock('lists_create_with',obj._id);
              bl.initSvg();
              bl.render();
              
              let len=obj.args.length;
              if (len >3){
                for (let i=3;i < len;i++){
                  bl.appendValueInput("ADD"+i);
                }
              }

              let j=0;
              for (let item of obj.args){
                reverseParser(wk,item,bl.getInput("ADD"+j).connection);
                j++;
              }

              linkedConn.connect(bl.outputConnection);
              resolve(bl);

            }else if (obj.methodName=="isEmpty"){
              bl=wk.newBlock('lists_isEmpty',obj._id);
              bl.initSvg();
              bl.render();
              reverseParser(wk,obj.args[0],bl.getInput("VALUE").connection);
              linkedConn.connect(bl.outputConnection);
              resolve(bl);

            }else if (obj.methodName=="lengthOf"){
              bl=wk.newBlock('lists_length',obj._id);
              bl.initSvg();
              bl.render();
              reverseParser(wk,obj.args[0],bl.getInput("VALUE").connection);
              linkedConn.connect(bl.outputConnection);
              resolve(bl);

            }else if (obj.methodName=="getFirst"){
              bl=wk.newBlock('lists_getIndex',obj._id);
              bl.initSvg();
              bl.render();

              bl.setFieldValue(obj.mode,'MODE');
              bl.setFieldValue("FIRST","WHERE");
              reverseParser(wk,obj.args[0],bl.getInput("VALUE").connection);
              linkedConn.connect(bl.outputConnection);
              resolve(bl);

            }else if (obj.methodName=="getLast"){
              
              bl=wk.newBlock('lists_getIndex',obj._id);
              bl.initSvg();
              bl.render();

              bl.setFieldValue(obj.mode,'MODE');
              bl.setFieldValue("LAST","WHERE");
              reverseParser(wk,obj.args[0],bl.getInput("VALUE").connection);
              linkedConn.connect(bl.outputConnection);
              resolve(bl);

            }else if (obj.methodName=="getIdxFromStart"){
             
              bl=wk.newBlock('lists_getIndex',obj._id);
              bl.initSvg();
              bl.render();

              bl.setFieldValue(obj.mode,'MODE');
              bl.setFieldValue("FROM_START","WHERE");
              reverseParser(wk,obj.args[0],bl.getInput("VALUE").connection);
              reverseParser(wk,obj.args[1],bl.getInput("AT").connection);

              linkedConn.connect(bl.outputConnection);
              resolve(bl);

            }else if (obj.methodName=="getIdxFromEnd"){
              
              bl=wk.newBlock('lists_getIndex',obj._id);
              bl.initSvg();
              bl.render();

              bl.setFieldValue(obj.mode,'MODE');
              bl.setFieldValue("FROM_END","WHERE");
              reverseParser(wk,obj.args[0],bl.getInput("VALUE").connection);
              reverseParser(wk,obj.args[1],bl.getInput("AT").connection);

              linkedConn.connect(bl.outputConnection);
              resolve(bl);
            }else if (obj.methodName=="getRandom"){
              
              bl=wk.newBlock('lists_getIndex',obj._id);
              bl.initSvg();
              bl.render();

              bl.setFieldValue(obj.mode,'MODE');
              bl.setFieldValue("RANDOM","WHERE");
              reverseParser(wk,obj.args[0],bl.getInput("VALUE").connection);


              linkedConn.connect(bl.outputConnection);
              resolve(bl);
            }

            else if (obj.methodName=="setFirst"){
              bl=wk.newBlock('lists_setIndex',obj._id);
              bl.initSvg();
              bl.render();

              bl.setFieldValue(obj.mode,'MODE');
              bl.setFieldValue("FIRST","WHERE");
              reverseParser(wk,obj.args[0],bl.getInput("LIST").connection);
              reverseParser(wk,obj.args[1],bl.getInput("TO").connection);
              
              linkedConn.connect(bl.previousConnection);
              resolve(bl);

            }else if (obj.methodName=="setLast"){
              
              bl=wk.newBlock('lists_setIndex',obj._id);
              bl.initSvg();
              bl.render();

              bl.setFieldValue(obj.mode,'MODE');
              bl.setFieldValue("LAST","WHERE");
              reverseParser(wk,obj.args[0],bl.getInput("LIST").connection);
              reverseParser(wk,obj.args[1],bl.getInput("TO").connection);
              linkedConn.connect(bl.previousConnection);
              resolve(bl);

            }else if (obj.methodName=="setIdxFromStart"){
             
              bl=wk.newBlock('lists_setIndex',obj._id);
              bl.initSvg();
              bl.render();

              bl.setFieldValue(obj.mode,'MODE');
              bl.setFieldValue("FROM_START","WHERE");
              reverseParser(wk,obj.args[0],bl.getInput("LIST").connection);
              reverseParser(wk,obj.args[2],bl.getInput("AT").connection);
              reverseParser(wk,obj.args[1],bl.getInput("TO").connection);

              linkedConn.connect(bl.previousConnection);
              resolve(bl);

            }else if (obj.methodName=="setIdxFromEnd"){
              
              bl=wk.newBlock('lists_setIndex',obj._id);
              bl.initSvg();
              bl.render();

              bl.setFieldValue(obj.mode,'MODE');
              bl.setFieldValue("FROM_END","WHERE");
              reverseParser(wk,obj.args[0],bl.getInput("LIST").connection);
              reverseParser(wk,obj.args[2],bl.getInput("AT").connection);
              reverseParser(wk,obj.args[1],bl.getInput("TO").connection);

              linkedConn.connect(bl.previousConnection);
              resolve(bl);
            }else if (obj.methodName=="setRandom"){
              
              bl=wk.newBlock('lists_setIndex',obj._id);
              bl.initSvg();
              bl.render();

              bl.setFieldValue(obj.mode,'MODE');
              bl.setFieldValue("RANDOM","WHERE");
              reverseParser(wk,obj.args[0],bl.getInput("LIST").connection);
              reverseParser(wk,obj.args[1],bl.getInput("TO").connection);

              linkedConn.connect(bl.previousConnection);
              resolve(bl);
            }
          break;

          case 'controlFlow':
            
            bl=wk.newBlock('controls_flow_statements',obj._id);
            
            bl.initSvg();
            bl.render();

            bl.setFieldValue(obj.args[0],'FLOW');
            linkedConn.connect(bl.previousConnection);
            
            resolve(bl);
          break;
          
          case 'controlIfelse':
           
            bl=wk.newBlock('controls_if',obj._id);
            bl.initSvg();
            bl.render();

            reverseParser(wk,obj.objIf,bl.getInput("IF0").connection);
            
            for (let subObj_1 of obj.doIf){
              reverseParser(wk,subObj_1,bl.getInput("DO0").connection);
            }
            
            if( !bl.getInput("ELSE")){
              let inp=bl.appendStatementInput("ELSE");
              inp.appendField(new Blockly.FieldLabel("else"));
            }

            for (let subObj_2 of obj.doElse){
              reverseParser(wk,subObj_2,bl.getInput("ELSE").connection);
            }

            if (linkedConn){
              linkedConn.connect(bl.previousConnection);
            }
            resolve(bl);
          break;
        
          case  'controlComp':
            bl=wk.newBlock('logic_compare',obj._id);
            bl.initSvg();
            bl.render();

            const OPERATORS = {
              'equal':'EQ',
              'not_equal':"NEQ",
              'inf':'LT',
              'inf_equal':'LTE',
              'sup':'GT',
              'sup_equal':'GTE'
            };

            bl.setFieldValue(OPERATORS[obj.operator],'OP');
            reverseParser(wk,obj.args[0],bl.getInput("A").connection);
            reverseParser(wk,obj.args[1],bl.getInput("B").connection);
            
            linkedConn.connect(bl.outputConnection);
            resolve(bl);

          break;

          case  'controlAnd':
            bl=wk.newBlock('logic_operation',obj._id);
            bl.initSvg();
            bl.render();

            bl.setFieldValue(obj.operator,'OP');
            reverseParser(wk,obj.args[0],bl.getInput("A").connection);
            reverseParser(wk,obj.args[1],bl.getInput("B").connection);
            
            linkedConn.connect(bl.outputConnection);
            resolve(bl);
            
          break;
          case 'controlForeach':
             bl=wk.newBlock('controls_forEach',obj._id);
            
            bl.initSvg();
            bl.render();
            //let fv=new Blockly.FieldVariable(obj.args[0]);

            let variable=wk.getVariableById(bl.getFieldValue('VAR'));
            variable.name=obj.args[0];

            reverseParser(wk,obj.args[1],bl.getInput("LIST").connection);

            nextCon=bl.getInput("DO").connection
              for (let subObj of obj.doLoop){
                let subl=await reverseParser(wk, subObj,nextCon);
                if (subl && subl.nextConnection)
                  nextCon=subl.nextConnection;
              }
            
            linkedConn.connect(bl.previousConnection);
            resolve(bl);
            break;
          
          case 'controlLoop':
            bl=wk.newBlock('controls_repeat_ext',obj._id);
            
            bl.initSvg();
            bl.render();

            reverseParser(wk,obj.objCount,bl.getInput("TIMES").connection);
            
            nextCon=bl.getInput("DO").connection
              for (let subObj of obj.doLoop){
                let subl=await reverseParser(wk, subObj,nextCon);
                nextCon=subl.nextConnection;
              }
            
            linkedConn.connect(bl.previousConnection);
            resolve(bl);
          break;

          case 'controlWhile':
            bl=wk.newBlock('controls_whileUntil',obj._id);
    
            bl.initSvg();
            bl.render();

            reverseParser(wk,obj.objWhile,bl.getInput("BOOL").connection);
            
            nextCon=bl.getInput("DO").connection
            for (let subObj of obj.doWhile){
              let subl= reverseParser(wk, subObj,nextCon);
              nextCon=subl.nextConnection;
            }
           

            linkedConn.connect(bl.previousConnection);
            resolve(bl);
          break;


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
          

          case 'objectTime':
            if (obj.methodName=='timeComp'){
              bl=wk.newBlock('magik_timecomp',obj._id);
              bl.initSvg();
              bl.render();
            
              bl.setFieldValue(obj.operator,'OP');
              reverseParser(wk,obj.args[0],bl.getInput("A").connection);
              reverseParser(wk,obj.args[1],bl.getInput("B").connection);
            
              linkedConn.connect(bl.outputConnection);
            }else if (obj.methodName=='time'){
              bl=wk.newBlock('magik_time',obj._id);
              bl.initSvg();
              bl.render();
            
              bl.setFieldValue(obj.args[0],'HOUR');
              bl.setFieldValue(obj.args[1],'MINUTE');

              linkedConn.connect(bl.outputConnection);

            }else if (obj.methodName=='timeNow'){
              bl=wk.newBlock('magik_timenow',obj._id);
              bl.initSvg();
              bl.render();
            
              linkedConn.connect(bl.outputConnection);

            }else if (obj.methodName=='timeBetween'){
              bl=wk.newBlock('magik_timebetween',obj._id);
              bl.initSvg();
              bl.render();

              reverseParser(wk,obj.args[0],bl.getInput("A").connection);
              reverseParser(wk,obj.args[1],bl.getInput("B").connection);
              reverseParser(wk,obj.args[2],bl.getInput("C").connection);
              
              linkedConn.connect(bl.outputConnection);
            }
            else if (obj.methodName=='timeAstro'){
              bl=wk.newBlock('magik_timeastro',obj._id);
              bl.setFieldValue(obj.args[0],'ASTRO');
              bl.initSvg();
              bl.render();
            
              linkedConn.connect(bl.outputConnection);
            }else if (obj.methodName=='timeWait'){
              bl=wk.newBlock('magik_timewait',obj._id);
              bl.initSvg();
              bl.render();
              reverseParser(wk,obj.args[0],bl.getInput("DURATION").connection);
              if (linkedConn){
                linkedConn.connect(bl.previousConnection);
              }
            }else if (obj.methodName=='timeOffset'){
              bl=wk.newBlock('magik_timeoffset',obj._id);
              bl.initSvg();
              bl.render();
              reverseParser(wk,obj.args[0],bl.getInput("TIME").connection);
              reverseParser(wk,obj.args[1],bl.getInput("HOUR").connection);
              reverseParser(wk,obj.args[2],bl.getInput("MIN").connection);
              
              linkedConn.connect(bl.outputConnection);
            }else if (obj.methodName=='timeDelay'){

              bl=wk.newBlock('magik_timedelay',obj._id);
              bl.initSvg();
              bl.render();
              linkedConn.connect(bl.previousConnection);
              reverseParser(wk,obj.args[0],bl.getInput("OFFSET").connection);
              
              nextCon=bl.getInput("DO").connection
              for (let subObj of obj.objDo){
                let subl=await reverseParser(wk, subObj,nextCon);
                nextCon=subl.nextConnection;
              }
            }else if (obj.methodName=='timeTrigger'){
              bl=wk.newBlock('magik_timetrigger',obj._id);
              bl.initSvg();
              bl.render();
              reverseParser(wk,obj.args[0],bl.getInput("TIME").connection);
              
              linkedConn.connect(bl.previousConnection);
            }else if (obj.methodName=='timeToString'){
              bl=wk.newBlock('magik_timetostring',obj._id);
              bl.initSvg();
              bl.render();
              reverseParser(wk,obj.args[0],bl.getInput("TIME").connection);
              linkedConn.connect(bl.outputConnection);

            }else if (obj.methodName=='timeCron'){

              bl=wk.newBlock('magik_timecron',obj._id);
              bl.initSvg();
              bl.render();

              bl.setFieldValue(args[0],'TRIGGER_NAME');
              reverseParser(wk,obj.args[1],bl.getInput("MINUTE").connection);
              reverseParser(wk,obj.args[2],bl.getInput("HOUR").connection);
              reverseParser(wk,obj.args[3],bl.getInput("DOM").connection);
              reverseParser(wk,obj.args[4],bl.getInput("MONTH").connection);
              reverseParser(wk,obj.args[5],bl.getInput("DOW").connection);
              linkedConn.connect(bl.previousConnection);
            }

            resolve(bl);
          break;
          case 'objectDevice':
            if (obj.methodName=='setCx'){
               bl=wk.newBlock('magik_device_setcx',obj._id);
              bl.initSvg();
              bl.render();

              bl.setFieldValue(obj.args[0],'DEVICE');
              bl.setFieldValue(obj.args[1],'SERVICE');
              bl.setFieldValue(obj.args[2],'CX');
              
              reverseParser(wk,obj.args[3],bl.getInput("VALUE").connection);

              if (linkedConn){
              linkedConn.connect(bl.previousConnection);
              }
            }else if (obj.methodName=='getCx'){
              bl=wk.newBlock('magik_device_getcx',obj._id);
              bl.initSvg();
              bl.render();

              bl.setFieldValue(obj.args[0],'DEVICE');
              bl.setFieldValue(obj.args[1],'SERVICE');
              bl.setFieldValue(obj.args[2],'CX');
              
              linkedConn.connect(bl.outputConnection);
            }else if (obj.methodName=='getCxProps'){
              bl=wk.newBlock('magik_device_getcxprops',obj._id);
              bl.initSvg();
              bl.render();
              console.log(obj.args);
              bl.setFieldValue(obj.args[0],'DEVICE');
              bl.setFieldValue(obj.args[1],'SERVICE');
              bl.setFieldValue(obj.args[2],'CX');
              bl.setFieldValue(obj.args[3],'PROPS');
              
              linkedConn.connect(bl.outputConnection);
            } 
            resolve(bl);
            break;

          case 'objectEmail':
            bl=wk.newBlock('magik_email_send',obj._id);
            bl.initSvg();
            bl.render();

            //
            // Manage the field
            //

            reverseParser(wk,obj.to,bl.getInput("TO").connection);
            reverseParser(wk,obj.subject,bl.getInput("SUBJECT").connection);
            reverseParser(wk,obj.body,bl.getInput("BODY").connection);
            
            if (linkedConn){
              linkedConn.connect(bl.previousConnection);
            }
            
            resolve(bl);
          break;
          
          case 'objectNumber':
            
            let AR_OPERATORS = {
              'add': 'ADD',
              'minus': 'MINUS',
              'multiply': 'MULTIPLY',
              'divide': 'DiVIDE',
              'power': 'POWER'
            };

            if(AR_OPERATORS[obj.methodName]){
              bl=wk.newBlock('math_arithmetic',obj._id);
              bl.initSvg();
              bl.render();

              bl.setFieldValue(AR_OPERATORS[obj.methodName],'OP');
              reverseParser(wk,obj.args[0],bl.getInput("A").connection);
              reverseParser(wk,obj.args[1],bl.getInput("B").connection);
            
              linkedConn.connect(bl.outputConnection);
             
            }else if(obj.methodName=='random'){
              bl=wk.newBlock('magik_random',obj._id);
              bl.initSvg();
              bl.render();

              reverseParser(wk,obj.args[0],bl.getInput("FROM").connection);
              reverseParser(wk,obj.args[1],bl.getInput("TO").connection);
              linkedConn.connect(bl.outputConnection);
            }
            resolve(bl);
          break;

          case 'objectSpell':
            if (obj.methodName=='executeSpell'){
              bl=wk.newBlock('magik_spell_execute',obj._id);
              bl.initSvg();
              bl.render();

              bl.setFieldValue(obj.spellId,'SPELL');

              if (linkedConn){
                linkedConn.connect(bl.previousConnection);
              }
            }

            if (obj.methodName=='set'){
              bl=wk.newBlock('magik_spell_set',obj._id);
              bl.initSvg();
              bl.render();

              bl.setFieldValue(obj.spellId,'SPELL');
              bl.setFieldValue(obj.arg0,'PROPS');
              reverseParser(wk,obj.arg1,bl.getInput("VAL").connection);
              if (linkedConn){
                linkedConn.connect(bl.previousConnection);
              }
            }

            if (obj.methodName=='get'){
              bl=wk.newBlock('magik_spell_get',obj._id);
              bl.initSvg();
              bl.render();

              bl.setFieldValue(obj.spellId,'SPELL');
              bl.setFieldValue(obj.arg0,'PROPS');
             
              linkedConn.connect(bl.outputConnection);
            }

            resolve(bl);
          break;

          case 'objectString':
            
            let CC_OPERATORS = {
              'toUpperCase':'UPPERCASE',
              'toLowerCase':'LOWERCASE',
              'toTitleCase':'TITLECASE'
            }; 
            if (obj.methodName=='toLowerCase' || obj.methodName=='toUpperCase' || obj.methodName=='toTitleCase' ){
              
              bl=wk.newBlock('text_changeCase',obj._id);
              bl.initSvg();
              bl.render();
              
              bl.setFieldValue(CC_OPERATORS[obj.methodName],'CASE');
              reverseParser(wk,obj.args[0],bl.getInput("TEXT").connection);
              
              linkedConn.connect(bl.outputConnection);
            }

             if (obj.methodName=='contains'){
              
              bl=wk.newBlock('text_indexOf',obj._id);
              bl.initSvg();
              bl.render();
              let TI_OPERATORS={
                'indexOf':'FIRST',
                'lastIndexOf':'END'
              }
              bl.setFieldValue(TI_OPERATORS[obj.operator],'END');
              reverseParser(wk,obj.args[0],bl.getInput("VALUE").connection);
              reverseParser(wk,obj.args[1],bl.getInput("FIND").connection);
              linkedConn.connect(bl.outputConnection);
            }

            if (obj.methodName=='concat'){
              
              bl=wk.newBlock('text_join',obj._id);
              bl.initSvg();
              bl.render();
              
              //code+= Blockly.JavaScript.valueToCode(block, 'ADD' + i,Blockly.JavaScript.ORDER_ATOMIC)|| '""';
              let len=obj.args.length;

              if (len >2)
              for (let i=2;i< len;i++){
                bl.appendValueInput("ADD"+i);
              }

              for (let idx in obj.args){
                reverseParser(wk,obj.args[idx],bl.getInput("ADD"+idx).connection);
              }
              linkedConn.connect(bl.outputConnection);
            }


            if (obj.methodName=='isEmpty'){
              
              bl=wk.newBlock('text_isEmpty',obj._id);
              bl.initSvg();
              bl.render();
              
              reverseParser(wk,obj.args[idx],bl.getInput("ADD"+idx).connection);
              
              linkedConn.connect(bl.outputConnection);
            }

            if (obj.methodName=='multiLine'){
              
              bl=wk.newBlock('text_multiline',obj._id);
              bl.initSvg();
              bl.render();
              
              bl.setFieldValue(obj.args[0],'TEXT');
              linkedConn.connect(bl.outputConnection);
            }

            resolve(bl);

          break;

          case 'objectVariable':
            if (obj.methodName=='setValue'){
              bl=wk.newBlock('variables_set',obj._id);
              
              let variable=wk.getVariableById(bl.getFieldValue('VAR'));
              variable.name=obj.varName;

              bl.initSvg();
              bl.render();

              reverseParser(wk,obj.valueObj,bl.getInput('VALUE').connection);
              
              if (linkedConn){
                  linkedConn.connect(bl.previousConnection);
              }
              
              resolve(bl); // return for further linking
            }else if(obj.methodName=='getValue'){
              
              bl=wk.newBlock('variables_get',obj._id);
              let variable=wk.getVariableById(bl.getFieldValue('VAR'));
              variable.name=obj.varName;

              bl.initSvg();
              bl.render();

              if (linkedConn){
                linkedConn.connect(bl.outputConnection);
              }
              
              resolve(bl); // return for further linking
            }
          break;

          case 'objectWait':
            bl=wk.newBlock('magik_wait',obj._id);
            bl.initSvg();
            bl.render();

            reverseParser(wk,obj.objDuration,bl.getInput('DURATION').connection);
            if (linkedConn){
              linkedConn.connect(bl.previousConnection);
            }
            resolve(bl);
          break;

          case 'objectSMS': // To be Tested
            if (obj.methodName=='send'){
              bl=wk.newBlock('magik_sms_send',obj._id);
              //bl.setFieldValue(obj.msisdn,'DURATION');
              bl.initSvg();
              bl.render();
              
              reverseParser(wk,obj.msisdn,bl.getInput("MSISDN").connection);
              reverseParser(wk,obj.msg,bl.getInput("MSG").connection);
              
              if (linkedConn){
                linkedConn.connect(bl.previousConnection);
              }
            }
            resolve(bl);
          break;

          default:
            resolve(bl);
          break;

        }
      }
    })
  }
export default reverseParser