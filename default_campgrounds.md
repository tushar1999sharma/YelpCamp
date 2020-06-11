some default campgrounds
campGround.create(
    {
        name: "Survival Camping",
        image: "https://www.survivaltechshop.com/wp-content/uploads/2019/05/survival-camping-1.jpg",
        price: "$7",
        description: 'This is the most extreme form of camping and to only be attempted by skilled and experienced campers. Think of this as the "Bear Grylls" type of camping. The aim of this activity is to become self-sufficient or a period of time and return alive. Food is found from the forest by hunting and gathering. This could include fishing, trapping, or gathering nuts, berries, and edible plants. Depending on where you are located, it can also be important to avoid any larger dangerous animals that could pose a threat. This kind of camping also requires advanced camping and survival skills. It is possible to learn from courses on how to survive in the wilderness before attempting it for real. One helpful book that can teach you the necessary skills is the SAS Survival Handbook by John Wiseman.This is a suitable challenge for advanced campers who want to put their skills to the ultimate test. Of course this does entail a real level of danger. Proper planning is necessary and not something that should ever be attempted by novices.',
        author: { id: "5e5c077df5176f3ed08dce46", username: 'tushar1999sharma' }
    }, function(err,campground){
        if(err){
            console.log(err);
        }
        else{
            console.log(campground);
        }
    }
)
campGround.create(
    {
        name: "Tent Camping",
        image: "https://www.survivaltechshop.com/wp-content/uploads/2019/05/tent-camping-1.jpg",
        price: "$10",
        description: 'The most basic and popular type of camping is of course tent camping. It involves heading to a park, pitching a tent, and sleeping there for a few nights. You can choose to stay on a campsite, in the woods, a beach, or anywhere else you desire.Tent camping is a great option for those new to camping, and that want to get started without spending a lot of money. It is also good for families with children as it creates time for bonding and learning how to work together.',
        author: { id: "5e5c077df5176f3ed08dce46", username: 'tushar1999sharma' }
    }, function(err,campground){
        if(err){
            console.log(err);
        }
        else{
            console.log(campground);
        }
    }
) 
campGround.create(
    {
        name: "RV or Van Camping",
        image: "https://www.survivaltechshop.com/wp-content/uploads/2019/05/rv-camping-1.jpg",
        price: "$15",
        description: 'Camping in an RV or van combines the pleasures of getting outside and getting close to nature, along with the accommodations of a small hotel. As many call them their "house on wheels", they also provide a means of transport during your travels. Some may say it is not really camping at all yet it is perfect for people who like a little luxury and those who are retired. By traveling in your own vehicle, you are much more mobile and anywhere you park becomes your campsite. You are also protected from the cold, heat, and bad weather. Not to mention many RVs or vans have stoves, fridges, and a full bathroom. The primary downside is that vehicles cannot go everywhere that someone on foot or in a kayak or canoe can go. Access to true wilderness is more limited. However, RV or van camping can also open you up to the entire country by setting off on short weekend trips, extended road trips, RV living, or van life.',
        author: { id: "5e5c077df5176f3ed08dce46", username: 'tushar1999sharma' }
    }, function(err,campground){
        if(err){
            console.log(err);
        }
        else{
            console.log(campground);
        }
    }
) 
campGround.create(
    {
        name: "Backpacking",
        image: "https://www.survivaltechshop.com/wp-content/uploads/2019/05/backpacking-camping.jpg",
        price: "$8",
        description: 'Backpacking involves spending the day carrying all your gear and equipment on your back, traveling through nature. Then, you sleep outside in a tent or hammock. These kinds of trips can last anywhere from one night, to several months. This type of camping allows for a level of self-sufficiency and the ability to spend time away from the stresses of day to day life and instead closer to nature. You will need to plan your trip and let someone know of your plans in case any emergencies happen and you do not return. Then, they can alert authorities to initiate a search and rescue. Another important consideration is the weight of the materials you plan to take with you. With everything on your back, you are going to want to pack ultralight gear. This also means careful packing of your backpack and what you plan to take with you.',
        author: { id: "5e5c077df5176f3ed08dce46", username: 'tushar1999sharma' }
    }, function(err,campground){
        if(err){
            console.log(err);
        }
        else{
            console.log(campground);
        }
    }
) 
campGround.create(
    {
        name: "Car Camping",
        image: "https://www.survivaltechshop.com/wp-content/uploads/2019/05/car-camping.jpg",
        price: "$12",
        description: 'There is a lot of people out there who want to go camping, but do not think they have the gear or all the right stuff to go. The truth is you do not need a whole bunch of stuff, you only need a few things and you probably already have several of them. Car camping is the perfect solution as you can use whatever you already have at home. Many hatchback cars work perfect for this by folding down the seats for more room inside. Lay down a sleeping pad or some blankets for cushioning, and you have got yourself an area to sleep. It is not the most glamorous form of camping, yet it is simple and easy to do. If you are on a low budget or want to try out camping for the first time, car camping can be a great option for you.',
        author: { id: "5e5c077df5176f3ed08dce46", username: 'tushar1999sharma' }
    }, function(err,campground){
        if(err){
            console.log(err);
        }
        else{
            console.log(campground);
        }
    }
) 