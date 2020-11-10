# Some reflexion about the Spell Engine Structure for Magik 2

## List of Objects to be modelized


* Device Controller
** Device
*** Service
**** Value
* WebService
* Email
* SMS
* GPIO
* Wait
* Time
* Variable

* Container
** If
** Compare
** Loop
** While
** Iterator
** Event
** Affectation
** Executer Methode


*Math
**Round
**isEven

# Modelisation of Object

## Standard Object 


{
	id:'ID'
	displayName:''
	type:''
	isValid:boolean,

}

## IF 

{
	type:"if",
	leftOp:'Object',
	rightOp:'Object',
	operator:'string'
	then:[],
	else:[]
}
