// frontend/src/utils/mockData.js
export const mockRemedies = [
    {
      _id: '1',
      name: "Honey Lemon Ginger Tea",
      ailment: "Sore Throat & Cold",
      ingredients: ["2 tbsp Honey", "1 Lemon", "1-inch Fresh Ginger", "Hot water", "Optional: Cinnamon stick"],
      instructions: "1. Slice fresh ginger into thin pieces\n2. Boil water and add ginger, let steep for 5 minutes\n3. Add honey and juice of one lemon\n4. Add cinnamon stick if desired\n5. Drink while warm, 2-3 times daily",
      effectiveness_rating: 4,
      budget_rating: "$",
      source: "Traditional Chinese Medicine",
      image: {
        url: "https://images.pexels.com/photos/1417945/pexels-photo-1417945.jpeg?auto=compress&cs=tinysrgb&w=800",
        alt: "Hot tea with honey, lemon and ginger"
      }
    },
    {
      _id: '2',
      name: "Turmeric Golden Milk",
      ailment: "Inflammation & Joint Pain",
      ingredients: ["1 cup Plant-based milk", "1 tsp Turmeric powder", "1/4 tsp Black pepper", "1 tsp Honey", "1/4 tsp Cinnamon"],
      instructions: "1. Heat milk in a small saucepan\n2. Add turmeric, black pepper, and cinnamon\n3. Whisk well while heating\n4. Simmer for 5 minutes\n5. Remove from heat and add honey\n6. Strain if desired and drink before bed",
      effectiveness_rating: 5,
      budget_rating: "$$",
      source: "Ayurvedic Medicine",
      image: {
        url: "https://images.pexels.com/photos/4051586/pexels-photo-4051586.jpeg?auto=compress&cs=tinysrgb&w=800",
        alt: "Golden turmeric latte in a white cup"
      }
    },
    {
      _id: '3',
      name: "Lavender Sleep Sachet",
      ailment: "Insomnia & Anxiety",
      ingredients: ["1/2 cup Dried lavender", "1/4 cup Chamomile flowers", "Small cotton sachet", "2 drops Lavender essential oil"],
      instructions: "1. Mix dried lavender and chamomile in a bowl\n2. Add 2 drops of lavender essential oil\n3. Fill cotton sachet with mixture\n4. Place under pillow before bed\n5. Replace mixture monthly",
      effectiveness_rating: 4,
      budget_rating: "$$$",
      source: "Aromatherapy Practice",
      image: {
        url: "https://images.pexels.com/photos/4041392/pexels-photo-4041392.jpeg?auto=compress&cs=tinysrgb&w=800",
        alt: "Lavender flowers and sachet"
      }
    },
    {
      _id: '4',
      name: "Apple Cider Vinegar Tonic",
      ailment: "Digestive Issues & Bloating",
      ingredients: ["2 tbsp Apple Cider Vinegar", "1 cup Warm water", "1 tsp Honey", "Pinch of Cayenne pepper"],
      instructions: "1. Mix apple cider vinegar with warm water\n2. Add honey and stir until dissolved\n3. Add a pinch of cayenne pepper\n4. Drink before meals\n5. Best taken 15-20 minutes before eating",
      effectiveness_rating: 3,
      budget_rating: "$",
      source: "Folk Medicine",
      image: {
        url: "https://images.pexels.com/photos/6969266/pexels-photo-6969266.jpeg?auto=compress&cs=tinysrgb&w=800",
        alt: "Apple cider vinegar tonic in glass"
      }
    },
    {
      _id: '5',
      name: "Eucalyptus Steam Inhalation",
      ailment: "Congestion & Sinusitis",
      ingredients: ["5 drops Eucalyptus oil", "4 cups Hot water", "1 Large towel", "Optional: 2 drops Peppermint oil"],
      instructions: "1. Boil water and transfer to a large bowl\n2. Add eucalyptus and peppermint oils\n3. Place face over bowl at comfortable distance\n4. Cover head with towel to create tent\n5. Inhale steam for 10-15 minutes\n6. Repeat 2-3 times daily",
      effectiveness_rating: 5,
      budget_rating: "$$",
      source: "Respiratory Therapy",
      image: {
        url: "https://images.pexels.com/photos/4041392/pexels-photo-4041392.jpeg?auto=compress&cs=tinysrgb&w=800",
        alt: "Eucalyptus leaves and essential oil"
      }
    },
    {
      _id: '6',
      name: "Chamomile Compress",
      ailment: "Eye Strain & Puffiness",
      ingredients: ["2 Chamomile tea bags", "1 cup Hot water", "Clean cloth", "Small bowl"],
      instructions: "1. Steep tea bags in hot water for 5 minutes\n2. Allow to cool to comfortable temperature\n3. Soak clean cloth in tea\n4. Apply compress to closed eyes\n5. Rest for 10-15 minutes\n6. Repeat as needed",
      effectiveness_rating: 4,
      budget_rating: "$",
      source: "Herbal Medicine",
      image: {
        url: "https://images.pexels.com/photos/5501994/pexels-photo-5501994.jpeg?auto=compress&cs=tinysrgb&w=800",
        alt: "Chamomile tea and flowers"
      }
    },
    {
      _id: '7',
      name: "Peppermint Digestive Tea",
      ailment: "Bloating & Indigestion",
      ingredients: ["Fresh peppermint leaves", "Hot water", "Honey (optional)", "Lemon slice (optional)"],
      instructions: "1. Wash fresh peppermint leaves\n2. Add leaves to teapot or cup\n3. Pour hot water over leaves\n4. Steep for 5-7 minutes\n5. Add honey or lemon if desired\n6. Drink after meals",
      effectiveness_rating: 4,
      budget_rating: "$",
      source: "Traditional Herbal Medicine",
      image: {
        url: "https://images.pexels.com/photos/5240677/pexels-photo-5240677.jpeg?auto=compress&cs=tinysrgb&w=800",
        alt: "Fresh peppermint tea"
      }
    }
  ];
  