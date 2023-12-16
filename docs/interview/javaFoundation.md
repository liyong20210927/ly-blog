---
lang: zh-CN
title: java基础
description: 基础不牢，地动山摇。
---
# java基础面试题

[[toc]]

## 1、java语言有哪些特点？

1、面向对象（封装、继承、多态）

2、通过java虚拟机实现平台的无关性（JVM通过加载.class字节码实现）

3、支持多线程

4、可靠性、安全性

5、支持网络编程并且十分方便

6、编译与解释共存

## 2、JVM、JDK、JRE有什么区别？

jvm：java虚拟机是运行java字节码的虚拟机。JVM针对不同的操作系统都有特定的实现，目的就是使用相同的字节码，可以实现相同的效果，字节码和不同系统的jvm是实现java语言“一次编译，处处可以运行”的关键所在

JDK：JDK是java development kit的缩写，他是功能齐全的java SDK。他用有JRE所拥有的一切，还有编译器（javac）和工具（javadoc和jdb等）。它能够创建编译程序。

JRE：java runtime environment，java运行时环境，它是运行已编译java程序的所有内容的集合，包括java虚拟机、java类库和其他的一些基础构件。但是，jre不可以用来构建新程序

如果只是为了运行java程序，那么就只需要jre就可以了，如果需要java编程方面的工作，那么就需要安装jdk。但是这不是绝对的，有时，尽管不进行java开发，仍然需要安装jdk，比如说在使用jsp部署web程序时，那么从技术上讲，你只是在应用程序服务器中运行java程序，但是，程序服务器会将jsp转换为java servlet，并且需要jdk来编译servlet。

## 3、什么是字节码，采用字节码有什么好处？

在java中，jvm可以理解的代码就叫做字节码（即扩展名为.class的文件），他不面向任何特定的处理器，只面向虚拟机。java语言通过字节码的方式，在一定程度上解决了传统解释型语言解释效率低的问题，同时又保留了解释型语言可移植的特点，所以，java程序运行时相对来说还是高效的，而且，由于字节码不针对一种特定的机器，因此，java程序无需重新编译便可以在多种不同的操作系统上运行。

java程序从源代码到运行的过程如下图所示：

![程序加载流程图](/images/java基础/程序加载流程图.png)

注意：.class机器码这一步，在这一步首先加载字节码文件，然后通过解释器逐行解释执行，这种方式的执行速度相对来说较慢。而且，有些热点代码和方法是需要被经常调用的，所以后面使用了JIT编译器，JIT属于运行时编译，档JIT编译器完成第一次编译之后，会将字节码对应的机器码保存下来，下次可以直接使用了，机器码的运行效率肯定是高于java解释器的，这也解释了我们为什么说java是编译与解释共存的语言。

HotSpot 采用了惰性评估(Lazy Evaluation)的做法，根据二八定律，消耗大部分系统资源的只有那一小部分的代码（热点代码），而这也就是 JIT 所需要编译的部分。JVM 会根据代码每次被执行的情况收集信息并相应地做出一些优化，因此执行的次数越多，它的速度就越快。JDK 9 引入了一种新的编译模式 AOT(Ahead of Time Compilation)，它是直接将字节码编译成机器码，这样就避免了 JIT 预热等各方面的开销。JDK 支持分层编译和 AOT 协作使用。

AOT 可以提前编译节省启动时间，那为什么不全部使用这种编译方式呢？

长话短说，这和 Java 语言的动态特性有千丝万缕的联系了。举个例子，CGLIB 动态代理使用的是 ASM 技术，而这种技术大致原理是运行时直接在内存中生成并加载修改后的字节码文件也就是 `.class` 文件，如果全部使用 AOT 提前编译，也就不能使用 ASM 技术了。为了支持类似的动态特性，所以选择使用 JIT 即时编译器。

## 4、为什么说JAVA语言编译与解释并存？

**编译型** ：[编译型语言open in new window]会通过[编译器open in new window]将源代码一次性翻译成可被该平台执行的机器码。一般情况下，编译语言的执行速度比较快，开发效率比较低。常见的编译性语言有 C、C++、Go、Rust 等等。

**解释型** ：[解释型语言open in new window]会通过[解释器open in new window]一句一句的将代码解释（interpret）为机器代码后再执行。解释型语言开发效率比较快，执行速度比较慢。常见的解释性语言有 Python、JavaScript、PHP 等等。

这是因为 Java 语言既具有编译型语言的特征，也具有解释型语言的特征。因为 Java 程序要经过先编译，后解释两个步骤，由 Java 编写的程序需要先经过编译步骤，生成字节码（`.class` 文件），这种字节码必须由 Java 解释器来解释执行。

## 5、JAVA和C++的区别？

Java 和 C++ 都是面向对象的语言，都支持封装、继承和多态，但是，它们还是有挺多不相同的地方：

- Java 不提供指针来直接访问内存，程序内存更加安全
- Java 的类是单继承的，C++ 支持多重继承；虽然 Java 的类不可以多继承，但是接口可以多继承。
- Java 有自动内存管理垃圾回收机制(GC)，不需要程序员手动释放无用内存。
- C ++同时支持方法重载和操作符重载，但是 Java 只支持方法重载（操作符重载增加了复杂性，这与 Java 最初的设计思想不符）。

## 6、JAVA语言关键字

![java关键字](/images/java基础/java关键字.png)

## 7、JAVA中的移位运算和与或非、异或

java中有三种移位运算符

<<    :   左移运算符，num << 1,相当于num乘以2

\>>    :   右移运算符，num >> 1,相当于num除以2

\>>>   :   无符号右移，忽略符号位，空位都以0补齐

由于 `double`，`float` 在二进制中的表现比较特殊，因此不能来进行移位操作。

移位操作符实际上支持的类型只有`int`和`long`，编译器在对`short`、`byte`、`char`类型进行移位前，都会将其转换为`int`类型再操作。

**如果移位的位数超过数值所占有的位数会怎样？**

当 int 类型左移/右移位数大于等于 32 位操作时，会先求余（%）后再进行左移/右移操作。也就是说左移/右移 32 位相当于不进行移位操作（32%32=0），左移/右移 42 位相当于左移/右移 10 位（42%32=10）。当 long 类型进行左移/右移操作时，由于 long 对应的二进制是 64 位，因此求余操作的基数也变成了 64。

也就是说：`x<<42`等同于`x<<10`，`x>>42`等同于`x>>10`，``x >>>42`等同于`i4 >>> 10`。

与：两位同时为“1”，结果才为“1”，否则为0

或：参加运算的两个对象只要有一个为1，其值为1。

非：1取0，0取1 ~1 = 0, ~0 = 1 ~(10001) = 01110

异或：参加运算的两个对象，如果两个相应位为“异”（值不同），则该位结果为1，否则为0。

## 8、Continue、break、return的区别是什么？

在循环结构中，当循环条件不满足或者循环次数达到要求时，循环会正常结束。但是，有时候可能需要在循环的过程中，当发生了某种条件之后 ，提前终止循环，这就需要用到下面几个关键词：

1. `continue` ：指跳出当前的这一次循环，继续下一次循环。
2. `break` ：指跳出整个循环体，继续执行循环下面的语句。

`return` 用于跳出所在方法，结束该方法的运行。return 一般有两种用法：

1. `return;` ：直接使用 return 结束方法执行，用于没有返回值函数的方法
2. `return value;` ：return 一个特定值，用于有返回值函数的方法

## 9、成员变量和局部变量的区别？

语法形式：从预防形式上看，成员变量属于类的，而局部变量是在代码块或方法中定义的局部变量或是方法的参数，成员变量可以被public、private、static等修饰符修饰，而局部变量不能被访问控制符修饰及static修饰，但是，成员变量和局部变量都能被final修饰。

存储方式：从变量在内存中的存储方式来看，如果成员变量是static修饰的，那么这个成员变量是属于类的，如果没有static修饰，成员变量是属于实例的，而对象存在于堆内存，局部变量存在栈内存，

生存时间：从变量在内存中的生存时间看，成员变量是对象的一部分，他随着对象的的创建而存在，而局部变量随着方法的调用随着方法的调用而自动生成，方法调用结束而消亡。

默认值：从变量是否有默认值来看，成员变量如果没有被赋默初始化值，则会以类型的默认值而被赋值（final修饰的成员变量也必须被显式的赋值），而局部变量不会被自动赋值。

静态变量有什么用？

静态变量可以被类的所有实例共享。无论一个类创建了多少个对象，它们都共享同一份静态变量。通常情况下，静态变量会被 `final` 关键字修饰成为常量。

## 10、字符型常量和字符串常量的区别?

1. **形式** : 字符常量是单引号引起的一个字符，字符串常量是双引号引起的 0 个或若干个字符。
2. **含义** : 字符常量相当于一个整型值( ASCII 值),可以参加表达式运算; 字符串常量代表一个地址值(该字符串在内存中存放位置)。
3. **占内存大小** ： 字符常量只占 2 个字节; 字符串常量占若干个字节（英文1个字节，中文utf-8占3个字节，gbk占2个字节）。

## 11、java中有几种基本数据类型？

![基本数据类型](/images/java基础/基本数据类型.png)

这八种基本类型都有对应的包装类分别为：`Byte`、`Short`、`Integer`、`Long`、`Float`、`Double`、`Character`、`Boolean` 。

## 12、 基本类型和包装类型的区别？

- 成员变量包装类型不赋值就是 `null` ，而基本类型有默认值且不是 `null`。
- 包装类型可用于泛型，而基本类型不可以。
- 基本数据类型的局部变量存放在 Java 虚拟机栈中的局部变量表中，基本数据类型的成员变量（未被 `static` 修饰 ）存放在 Java 虚拟机的堆中。（成员变量属于类，存在于堆中，static修饰的成员变量存放在方法中的静态区，局部变量属于方法不能加static、protect、private、public）包装类型属于对象类型，我们知道几乎所有对象实例都存在于堆中。
- 相比于对象类型， 基本数据类型占用的空间非常小。

## 13、包装类型的缓存机制

Java 基本数据类型的包装类型的大部分都用到了缓存机制来提升性能。

`Byte`,`Short`,`Integer`,`Long` 这 4 种包装类默认创建了数值 **[-128，127]** 的相应类型的缓存数据，`Character` 创建了数值在 **[0,127]** 范围的缓存数据，`Boolean` 直接返回 `True` or `False`。

两种浮点数类型的包装类 `Float`,`Double` 并没有实现缓存机制。

`Integer i1=40` 这一行代码会发生装箱，也就是说这行代码等价于 `Integer i1=Integer.valueOf(40)` 。因此，`i1` 直接使用的是缓存中的对象。而`Integer i2 = new Integer(40)` 会直接创建新的对象。

因此，答案是 `false` 。

说明：对于Integer var=？在-128至127之间的赋值，Integer对象是在IntegerCache.cache产生，会复用已有对象，这个区间内的Integer值可以直接使用==进行判断，但是这个区间之外的所有数据，都会在堆上产生，并不会复用已有对象，这是一个大坑，推荐使用equals方法进行判断。

## 14、浮点数运算精度丢失风险，超过long型的数据如何表示？

使用bigdecimal。使用bigint，不过效率会低。

## 15、面向对象和面向过程的区别？

两者的主要区别在于解决问题的方式不同：

- 面向过程把解决问题的过程拆成一个个方法，通过一个个方法的执行解决问题。
- 面向对象会先抽象出对象，然后用对象执行方法的方式解决问题。

另外，面向对象开发的程序一般更易维护、易复用、易扩展。

## 16、对象引用和对象实体有什么不同？

1、new创建对象实例存放在堆内存中，对象引用指向对象实例存放在栈内存中

2、一个对象引用可以指向 0 个或 1 个对象（一根绳子可以不系气球，也可以系一个气球）;一个对象可以有 n 个引用指向它（可以用 n 条绳子系住一个气球）。

### 对象的相等和引用相等的区别

- 对象的相等一般比较的是内存中存放的内容是否相等。
- 引用相等一般比较的是他们指向的内存地址是否相等。

## 17、面向对象的三大特征

封装：封装就是把一个对象的信息封装在对象的内部，不允许外部对象直接访问对象对象的内部信息，但是会提供一些可以被外界访问的的方法来操作属性。比如在创建一个类时，它的属性是私有的，但是我们提供了公有的get set方法

继承：继承是使用已有的类的定义作为基础建立新的类的技术，新类的定义可以增加加的数据或者新的功能，也可以使用父类的功能，但是不可以选择性的继承父类。通过继承，可以快速的创建新的类，可以提高代码的重用，程序的可维护性，节省创建类的时间，提高开发效率。

注意：1、子类拥有父类的所有属性和方法（包括私有属性和私有方法），但是父类中的私有属性和方法子类是无法访问的，只是拥有。

2、子类可以拥有自己的属性和方法，即子类对父类进行扩展

3、子类可以用自己的方式实现父类的方法。

多态：顾名思义，表示一个对象具有多种状态，具体表现为父类的引用指向子类的实例（三个必要条件，继承、重写、父类引用指向子类的实例）

特点：1、对象类型和引用类型之间具有继承（类）/实现（接口的关系）

2、引用类型发出的方法调用到底是哪个类中的方法，必须在程序运行期间才能确定

3、多态不能调用只在子类中存在而不再负累中存在的方法

4、如果子类覆盖了父类的方法，真正执行的是子类覆盖的方法，如果子类没有覆盖父类的方法，执行的是父类的方法

## 18、接口和抽象类有什么共同点和区别？

共同点：都不能被实例化，都可以包含抽象方法，都可以有默认实现的方法（java8可以用default关键字在接口中定义默认方法）

不同点：接口主要用于对类的行为进行约束，你实现了某个接口就具有了对应的行为。抽象类主要用于代码的复用，强调的是所属的关系。

一个类可以实现一个接口，但可以继承多个抽象类

接口中的成员变量只能是public static final的类型的，不能被修改且必须有初始值，而抽象类的成员变量默认是default的，可在子类中被重新定义，也可被重新赋值。

## 19、深拷贝和浅拷贝了解吗？是么是引用拷贝？

浅拷贝会在堆上创建一个新的对象（区别于引用拷贝的一点），不过，如果原有对象内部的属性是引用类型的话，浅拷贝会直接复制内部对象的引用地址，也就是说拷贝对象和原有对象公用一个内部对象。

深拷贝会完全复制整个对象，包括这个对象所包含的对象。

引用拷贝就是两个不同的引用指向同一个对象

![深拷贝浅拷贝引用拷贝](/images/java基础/深拷贝浅拷贝引用拷贝.png)

## 20、java中的常见类？

````java
/**
 * native 方法，用于返回当前运行时对象的 Class 对象，使用了 final 关键字修饰，故不允许子类重写。
 */
public final native Class<?> getClass()
/**
 * native 方法，用于返回对象的哈希码，主要使用在哈希表中，比如 JDK 中的HashMap。
 */
public native int hashCode()
/**
 * 用于比较 2 个对象的内存地址是否相等，String 类对该方法进行了重写以用于比较字符串的值是否相等。
 */
public boolean equals(Object obj)
/**
 * naitive 方法，用于创建并返回当前对象的一份拷贝。
 */
protected native Object clone() throws CloneNotSupportedException
/**
 * 返回类的名字实例的哈希码的 16 进制的字符串。建议 Object 所有的子类都重写这个方法。
 */
public String toString()
/**
 * native 方法，并且不能重写。唤醒一个在此对象监视器上等待的线程(监视器相当于就是锁的概念)。如果有多个线程在等待只会任意唤醒一个。
 */
public final native void notify()
/**
 * native 方法，并且不能重写。跟 notify 一样，唯一的区别就是会唤醒在此对象监视器上等待的所有线程，而不是一个线程。
 */
public final native void notifyAll()
/**
 * native方法，并且不能重写。暂停线程的执行。注意：sleep 方法没有释放锁，而 wait 方法释放了锁 ，timeout 是等待时间。
 */
public final native void wait(long timeout) throws InterruptedException
/**
 * 多了 nanos 参数，这个参数表示额外时间（以毫微秒为单位，范围是 0-999999）。 所以超时的时间还需要加上 nanos 毫秒。。
 */
public final void wait(long timeout, int nanos) throws InterruptedException
/**
 * 跟之前的2个wait方法一样，只不过该方法一直等待，没有超时时间这个概念
 */
public final void wait() throws InterruptedException
/**
 * 实例被垃圾回收器回收的时候触发的操作
 */
protected void finalize() throws Throwable { }
````

## 21、==和equals的区别是什么？

==对于基本数据类型来说比较的是值是否相同，对于引用类型来说比较的是引用是否相同。

equals默认情况下比较的是引用，只是有很多类重写了equals方法，比如String、Integer等，把它变成了值比较，所以一般情况下比较的是值是否相同。

因为java只有值传递，所以，对于==来说，不管是比较基本数据类型还是引用数据类型的变量，其本质比较的都是值，只是引用类型变量保存的值是对象的地址。

**`equals()`** 不能用于判断基本数据类型的变量，只能用来判断两个对象是否相等。`equals()`方法存在于`Object`类中，而`Object`类是所有类的直接或间接父类，因此所有的类都有`equals()`方法。

````java
public boolean equals(Object obj) {
     return (this == obj);
}
````

`equals()` 方法存在两种使用情况：

- **类没有重写 `equals()`方法** ：通过`equals()`比较该类的两个对象时，等价于通过“==”比较这两个对象，使用的默认是 `Object`类`equals()`方法。
- **类重写了 `equals()`方法** ：一般我们都重写 `equals()`方法来比较两个对象中的属性是否相等；若它们的属性相等，则返回 true(即，认为这两个对象相等)。

## 22、HashCode和Equals()?

> 当你把对象加入 `HashSet` 时，`HashSet` 会先计算对象的 `hashCode` 值来判断对象加入的位置，同时也会与其他已经加入的对象的 `hashCode` 值作比较，如果没有相符的 `hashCode`，`HashSet` 会假设对象没有重复出现。但是如果发现有相同 `hashCode` 值的对象，这时会调用 `equals()` 方法来检查 `hashCode` 相等的对象是否真的相同。如果两者相同，`HashSet` 就不会让其加入操作成功。如果不同的话，就会重新散列到其他位置。这样我们就大大减少了 `equals` 的次数，相应就大大提高了执行速度。
>
> ​																				----引用自《Head First Java》

本质上来说，hashcode()和equals()方法都适用于比较对象是否相等。

有了hashcode可以使在一些容器中（如：hashmap和hashset），可以判断元素是否在容器中的效率更高，如果hashcode相同，会继续使用equals方法继续判断是否真的相同，也就是说hashcode可以帮助我们缩小查找的成本。

两个对象的hashcode值相等并不代表两个对象就相等，因为hashcode（）所使用的哈希算法也许会让刚好多个对象的hashcode值相等，越糟糕的哈希算法越容易碰撞，但这也与数据值域的特性有关，（哈希碰撞就是指不同的的对象得到相同的hashcode）

总结：如果两个对象的hashCode相等，那这两个值不一定相等（哈希碰撞）

如果两个对象的hashCode值相等并且equals（）方法也返回true，那么这两个对象的才相等

如果两个对象的hashcode值不相等，我们就可以直接认这两个对象不相等

## 22、String、StringBuffer、StringBuilder的区别？

1、可变性

String是不可变的，StringBuffer和StringBuilder都继承自AbstractStringBuilder类，也是用字符数组保存字符串，不过没有使用private和final修饰，最关键的是这个 `AbstractStringBuilder` 类还提供了很多修改字符串的方法比如 `append` 方法。

2、线程安全性

String中的对象是不可变的，也可以理解为常量，线程安全。

StringBuilder是线程不安全的

StringBuffer是线程安全的，使用同步锁，方法加了同步锁或对调用的方法加了同步锁

3、性能

每次对String进行改变的时候，都会生成一个新的String对象，然后将指针指向新的String对象

StringBuffer每次会对对象本身进行操作，而不是生成新的对象并改变对象的应用

StringBuilder像对于StringBuffer可以提升10%-15%的性能，但是线程不安全

总结：

操作少量数据用String

单线程操作字符串缓冲区下操作大量数据使用StringBuilder

多线程操作字符创缓冲区下操作大量数据使用StringBuffer

## 23、String为什么是不可变的？

String类中使用final修饰的字符数组来保存字符串

final关键字修饰的类不能被继承，修饰的方法不能被重写，修饰的是基本数据类型值不能改变，修饰的变量是引用类型则不能再指向其他对象。因此，final关键字修饰的数据并不是String不可变的根本原因，因为这个数组保存的字符串是可变的（final修是引用类型变量的情况）。

String不可变的真正原因：

1、保存字符创的数组被final修饰且为私有的，并且String类没有提供/暴露修改这个字符串的方法。

2、String类被final修饰导致其不能被继承，进而避免子类破坏String不可变

补充：在java9之后，String、StringBuffer、StringBuilder的实现改用了byte[]数组存储字符串，新版的字符串支持两个编码方案：Latin-1和UTF-16,如果字符串中保存的汉字没有超过Latin-1表示内的范围，那就会使用Latin-1作为编码方案，Latin-1编码方案下。byte占一个字节（8位），char占两个字节（16位），byte相较于char节省一半的空间

## 24、字符串拼接用+还是StringBuilder？

java语言并不支持运算符的重载，+和+=是专门为String类重载的运算符，也是java中仅有的两个重载运算符。

字符创通过“+”进行字符创拼接的话，实际是通过StringBuilder的append（）方法实现的，拼接完成后调用了toString()方法dedaoyigeString对象，

在循环内部使用“+”进行字符串拼接的话，存在比较明显的缺陷，编译器不会创建单个StringBuilder以复用，对导致创建过多的StringBuilder对象。所以在循环中使用“+”进行字符串拼接，每循环一次就会创建一个StringBuilder对象。但是我们可以直接使用StringBuilder对象进行字符串拼接就不会出现这个问题。

## 25、String的equals方法的Object的equals方法有何区别？

String中equals方法是被重写过的，比较的是String字符串的值是否相等，Object中的equals方法是比较内对象的内存地址。

## 26、字符创常量池的作用了解吗？String S1 = new String("abc");这句话创建了几个字符串对象？intern 方法有什么作用?

字符串常量池是JVM为了提升性能和减少内存开销针对字符串（String类）专门开辟的一块内存区域，主要的目的是为了避免字符串的重复创建。

new在堆中，字符串常量池中，栈内保存地址

1、如果字符串常量池中不存在字符串对象“abc”的引用，那么会在堆中创建 2 个字符串对象“abc”。（一个字符串常量池、一个堆中）

2、如果字符串常量池中已存在字符串对象“abc”的引用，则只会在堆中创建 1 个字符串对象“abc”。

intern()如果字符创常量池中保存了对应的字符串对象的引用，就直接返回引用。

如果字符串常量池中没有保存了对应的字符串对象的引用，那就在常量池中创建一个指向该字符串的对象的引用并返回。

## 27、String类型的变量和常量在+时做了什么？

不加final的情况：

比较 String 字符串的值是否相等，可以使用 `equals()` 方法。 `String` 中的 `equals` 方法是被重写过的。 `Object` 的 `equals` 方法是比较的对象的内存地址，而 `String` 的 `equals` 方法比较的是字符串的值是否相等。如果你使用 `==` 比较两个字符串是否相等的话，IDEA 还是提示你使用 `equals()` 方法替换。

对于编译期可以确定值的字符串，也就是常量字符串 ，jvm 会将其存入字符串常量池。并且，字符串常量拼接得到的字符串常量在编译阶段就已经被存放字符串常量池，这个得益于编译器的优化。

在编译过程中，Javac 编译器（下文中统称为编译器）会进行一个叫做 **常量折叠(Constant Folding)** 的代码优化。

常量折叠会把常量表达式的值求出来作为常量嵌在最终生成的代码中，这是 Javac 编译器会对源代码做的极少量优化措施之一(代码优化几乎都在即时编译器中进行)。

对于 `String str3 = "str" + "ing";` 编译器会给你优化成 `String str3 = "string";` 

并不是所有的常量都会进行折叠，只有编译器在程序编译期就可以确定值的常量才可以：

- 基本数据类型( `byte`、`boolean`、`short`、`char`、`int`、`float`、`long`、`double`)以及字符串常量。
- `final` 修饰的基本数据类型和字符串变量
- 字符串通过 “+”拼接得到的字符串、基本数据类型之间算数运算（加减乘除）、基本数据类型的位运算（<<、>>、>>> ）

**引用的值在程序编译期是无法确定的，编译器无法对其进行优化。**

对象引用和“+”的字符串拼接方式，实际上是通过 `StringBuilder` 调用 `append()` 方法实现的，拼接完成之后调用 `toString()` 得到一个 `String` 对象 。

````java
String str4 = new StringBuilder().append(str1).append(str2).toString();
````

我们在平时写代码的时候，尽量避免多个字符串对象拼接，因为这样会重新创建对象。如果需要改变字符串的话，可以使用 `StringBuilder` 或者 `StringBuffer`。

不过，字符串使用 `final` 关键字声明之后，可以让编译器当做常量来处理。

````java
final String str1 = "str";
final String str2 = "ing";
//String str1 = "str";false
//String str2 = "ing";false
// 下面两个表达式其实是等价的
String c = "str" + "ing";// 常量池中的对象
String d = str1 + str2; // 常量池中的对象
System.out.println(c == d);// true
````

被 `final` 关键字修改之后的 `String` 会被编译器当做常量来处理，编译器在程序编译期就可以确定它的值，其效果就相当于访问常量。

如果 ，编译器在运行时才能知道其确切值的话，就无法对其优化。

示例代码（`str2` 在运行时才能确定其值）：

````java
final String str1 = "str";
final String str2 = getStr();
String c = "str" + "ing";// 常量池中的对象
String d = str1 + str2; // 在堆上创建的新的对象
System.out.println(c == d);// false
public static String getStr() {
      return "ing";
}
````

## 28、Java异常类层次结构图

![image-20230405220138705](D:\study\vuepress-starter\docs\.vuepress\public\images\java基础\java异常层次结构图.png)



## 29、Exception和Error有什么区别？

在 Java 中，所有的异常都有一个共同的祖先 `java.lang` 包中的 `Throwable` 类。`Throwable` 类有两个重要的子类:

Exception：:程序本身可以处理的异常，可以通过 `catch` 来进行捕获。`Exception` 又可以分为 Checked Exception (受检查异常，必须处理) 和 Unchecked Exception (不受检查异常，可以不处理)。

Error：`Error` 属于程序无法处理的错误 ，我们没办法通过 `catch` 来进行捕获不建议通过`catch`捕获 。例如 Java 虚拟机运行错误（`Virtual MachineError`）、虚拟机内存不够错误(`OutOfMemoryError`)、类定义错误（`NoClassDefFoundError`）等 。这些异常发生时，Java 虚拟机（JVM）一般会选择线程终止。

## 30、CheckException和UnCheckException有什么区别？

**Checked Exception** 即 **受检查异常** ，Java 代码在编译过程中，如果受检查异常没有被 `catch`或者`throws` 关键字处理的话，就没办法通过编译。

除了`RuntimeException`及其子类以外，其他的`Exception`类及其子类都属于受检查异常 。常见的受检查异常有： IO 相关的异常、`ClassNotFoundException` 、`SQLException`...。

**Unchecked Exception** 即 **不受检查异常** ，Java 代码在编译过程中 ，我们即使不处理不受检查异常也可以正常通过编译。

`RuntimeException` 及其子类都统称为非受检查异常，常见的有（建议记下来，日常开发中会经常用到）：

- `NullPointerException`(空指针错误)
- `IllegalArgumentException`(参数错误比如方法入参类型错误)
- `NumberFormatException`（字符串转换为数字格式错误，`IllegalArgumentException`的子类）
- `ArrayIndexOutOfBoundsException`（数组越界错误）
- `ClassCastException`（类型转换错误）
- `ArithmeticException`（算术错误）
- `SecurityException` （安全错误比如权限不够）
- `UnsupportedOperationException`(不支持的操作错误比如重复创建同一用户)

## 31、Throwable类有哪些常用的方法？

`String getMessage()`: 返回异常发生时的简要描述

`String toString()`: 返回异常发生时的详细信息

`String getLocalizedMessage()`: 返回异常对象的本地化信息。使用 `Throwable` 的子类覆盖这个方法，可以生成本地化信息。如果子类没有覆盖该方法，则该方法返回的信息与 `getMessage()`返回的结果相同

`void printStackTrace()`: 在控制台上打印 `Throwable` 对象封装的异常信息

## 32、try-catch-finally 如何使用？

`try`块 ： 用于捕获异常。其后可接零个或多个 `catch` 块，如果没有 `catch` 块，则必须跟一个 `finally` 块。

`catch`块 ： 用于处理 try 捕获到的异常。

`finally` 块 ： 无论是否捕获或处理异常，`finally` 块里的语句都会被执行。当在 `try` 块或 `catch` 块中遇到 `return` 语句时，`finally` 语句块将在方法返回之前被执行。

**注意：不要在 finally 语句块中使用 return!** 当 try 语句和 finally 语句中都有 return 语句时，try 语句块中的 return 语句会被忽略。这是因为 try 语句中的 return 返回值会先被暂存在一个本地变量中，当执行到 finally 语句中的 return 之后，这个本地变量的值就变为了 finally 语句中的 return 返回值。

## 33、finally 中的代码一定会执行吗？

不一定的！在某些情况下，finally 中的代码不会被执行。

* 就比如说 finally 之前虚拟机被终止运行的话，finally 中的代码就不会被执行。

````java
try {
    System.out.println("开始");
    throw new RuntimeException("RuntimeException");
} catch (Exception e) {
    System.out.println("Catch Exception -> " + e.getMessage());
    // 终止当前正在运行的Java虚拟机
    System.exit(1);
} finally {
    System.out.println("最终");
}
//输出
Try to do something
Catch Exception -> RuntimeException
````

* 程序所在线程死亡，finally中代码也不会执行
* 关闭CPU

## 34、 如何使用 `try-with-resources` 代替`try-catch-finally`？

**适用范围（资源的定义）：** 任何实现 `java.lang.AutoCloseable`或者 `java.io.Closeable` 的对象

**关闭资源和 finally 块的执行顺序：** 在 `try-with-resources` 语句中，任何 catch 或 finally 块在声明的资源关闭后运行

>  《Effective Java》中明确指出：
>
> 面对必须要关闭的资源，我们总是应该优先使用 `try-with-resources` 而不是`try-finally`。随之产生的代码更简短，更清晰，产生的异常对我们也更有用。`try-with-resources`语句让我们更容易编写必须要关闭的资源的代码，若采用`try-finally`则几乎做不到这点。

Java 中类似于`InputStream`、`OutputStream` 、`Scanner` 、`PrintWriter`等的资源都需要我们调用`close()`方法来手动关闭，一般情况下我们都是通过`try-catch-finally`语句来实现这个需求，如下:

````
//读取文本文件的内容
Scanner scanner = null;
try {
    scanner = new Scanner(new File("D://read.txt"));
    while (scanner.hasNext()) {
        System.out.println(scanner.nextLine());
    }
} catch (FileNotFoundException e) {
    e.printStackTrace();
} finally {
    if (scanner != null) {
        scanner.close();
    }
}
------
著作权归所有
原文链接：https://javaguide.cn/java/basis/java-basic-questions-03.html
````

使用 Java 7 之后的 `try-with-resources` 语句改造上面的代码:

````java
try (Scanner scanner = new Scanner(new File("test.txt"))) {
    while (scanner.hasNext()) {
        System.out.println(scanner.nextLine());
    }
} catch (FileNotFoundException fnfe) {
    fnfe.printStackTrace();
}
------
著作权归所有
原文链接：https://javaguide.cn/java/basis/java-basic-questions-03.html
````

当然多个资源需要关闭的时候，使用 `try-with-resources` 实现起来也非常简单，如果你还是用`try-catch-finally`可能会带来很多问题。

通过使用分号分隔，可以在`try-with-resources`块中声明多个资源。

````java
try (BufferedInputStream bin = new BufferedInputStream(new FileInputStream(new File("test.txt")));
     BufferedOutputStream bout = new BufferedOutputStream(new FileOutputStream(new File("out.txt")))) {
    int b;
    while ((b = bin.read()) != -1) {
        bout.write(b);
    }
}
catch (IOException e) {
    e.printStackTrace();
}
------
著作权归所有
原文链接：https://javaguide.cn/java/basis/java-basic-questions-03.html
````

## 35、异常使用有那些需要注意的地方？

不要把异常定义为静态变量，因为这样会导致异常栈信息错乱。每次手动抛出异常，我们都需要手动 new 一个异常对象抛出。

抛出的异常信息一定要有意义。

建议抛出更加具体的异常比如字符串转换为数字格式错误的时候应该抛出`NumberFormatException`而不是其父类`IllegalArgumentException`。

使用日志打印异常之后就不要再抛出异常了（两者不要同时存在一段代码逻辑中）。

## 36、什么是泛型，反省有什么作用？

**Java 泛型（Generics）** 是 JDK 5 中引入的一个新特性。使用泛型参数，可以增强代码的可读性以及稳定性。

编译器可以对泛型参数进行检测，并且通过泛型参数可以指定传入的对象类型。比如 `ArrayList<Person> persons = new ArrayList<Person>()` 这行代码就指明了该 `ArrayList` 对象只能传入 `Person` 对象，如果传入其他类型的对象就会报错。

并且，原生 `List` 返回类型是 `Object` ，需要手动转换类型才能使用，使用泛型后编译器自动转换。

## 37、序列化和反序列化

如果我们需要持久化 Java 对象比如将 Java 对象保存在文件中，或者在网络传输 Java 对象，这些场景都需要用到序列化。

- **序列化**： 将数据结构或对象转换成二进制字节流的过程
- **反序列化**：将在序列化过程中所生成的二进制字节流转换成数据结构或者对象的过程

对于 Java 这种面向对象编程语言来说，我们序列化的都是对象（Object）也就是实例化后的类(Class)，但是在 C++这种半面向对象的语言中，struct(结构体)定义的是数据结构类型，而 class 对应的是对象类型。

对于 Java 这种面向对象编程语言来说，我们序列化的都是对象（Object）也就是实例化后的类(Class)

对象在进行网络传输（比如远程方法调用 RPC 的时候）之前需要先被序列化，接收到序列化的对象之后需要再进行反序列化；

将对象存储到文件之前需要进行序列化，将对象从文件中读取出来需要进行反序列化；

将对象存储到数据库（如 Redis）之前需要用到序列化，将对象从缓存数据库中读取出来需要反序列化；

将对象存储到内存之前需要进行序列化，从内存中读取出来之后需要进行反序列化。

综上：**序列化的主要目的是通过网络传输对象或者说是将对象存储到文件系统、数据库、内存中。**

序列化属于网络七层模型中的网络层

## 38、如果某些字段不想被序列化怎么办？

如果不想被序列化，可以使用`transient` 关键字修饰。

`transient` 关键字的作用是：阻止实例中那些用此关键字修饰的的变量序列化；当对象被反序列化时，被 `transient` 修饰的变量值不会被持久化和恢复。

注意：

`transient` 只能修饰变量，不能修饰类和方法。

`transient` 修饰的变量，在反序列化后变量值将会被置成类型的默认值。例如，如果是修饰 `int` 类型，那么反序列后结果就是 `0`。

`static` 变量因为不属于任何对象(Object)，所以无论有没有 `transient` 关键字修饰，均不会被序列化。

## 39、常见的序列化协议

JDK 自带的序列化方式一般不会用 ，因为序列化效率低并且存在安全问题。比较常用的序列化协议有 Hessian、Kryo、Protobuf、ProtoStuff，这些都是基于二进制的序列化协议。

像 JSON 和 XML 这种属于文本类序列化方式。虽然可读性比较好，但是性能较差，一般不会选择。

## 40、为什么不推荐使用 JDK 自带的序列化？

**不支持跨语言调用** : 如果调用的是其他语言开发的服务的时候就不支持了。

**性能差** ：相比于其他序列化框架性能更低，主要原因是序列化之后的字节数组体积较大，导致传输成本加大。

**存在安全问题** ：序列化和反序列化本身并不存在问题。但当输入的反序列化的数据可被用户控制，那么攻击者即可通过构造恶意输入，让反序列化产生非预期的对象，在此过程中执行构造的任意代码。

## 41、