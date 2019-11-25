//Evaluate these:
//#1
[2] === [2] //false
{} === {} //false

//#2 what is the value of property a for each object.
const object1 = { a: 5 };  //obj1 a === 5
const object2 = object1;   //obj1.a === 5 obj2.a ===5
const object3 = object2;   // obj3 === 5
const object4 = { a: 5};  // obj4 === 5
object1.a = 4;            // obj 1 2 3 === 4


//#3 create two classes: an Animal class and a Mammal class. 
// create a cow that accepts a name, type and color and has a sound method that moo's her name, type and color. 

class Animal {
    constructor(name,color){
        this.name = name;
        this.color = color;
    }

}
class Mammal extends Animal {
    constructor(type,name,color){
        super(name,color);
        this.type = type;
    }
    sound(){
        let knownSound;
        switch (this.type) {
            case 'cow':
                knownSound = 'MOOOoOOOOOooo'
                break;
        
            default:
                knownSound = '(something funny)'
                break;
        } (this.type)

        console.log(`${this.name} the ${this.color} ${this.type} says: ${knownSound}`)
    }
}