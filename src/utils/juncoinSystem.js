// JunCoin - JUNFIN Platform Internal Currency System

const STORAGE_KEYS = {
  USER_DATA: 'junfin_user',
  TRANSACTIONS: 'junfin_transactions',
  TASKS: 'junfin_tasks',
  GOALS: 'junfin_goals',
  PURCHASES: 'junfin_purchases'
};

// Task reward amounts
export const TASK_REWARDS = {
  easy: 50,
  medium: 100,
  hard: 200,
  daily: 25,
  weekly: 150,
  monthly: 500
};

// Goal achievement bonuses
export const GOAL_BONUSES = {
  small: 100,
  medium: 300,
  large: 500,
  mega: 1000
};

// Transaction types
export const TRANSACTION_TYPES = {
  TASK_COMPLETION: 'task_completion',
  GOAL_ACHIEVEMENT: 'goal_achievement',
  PURCHASE: 'purchase',
  BONUS: 'bonus',
  TRANSFER: 'transfer',
  PENALTY: 'penalty'
};

// Get current user data
export const getCurrentUser = () => {
  const userData = localStorage.getItem(STORAGE_KEYS.USER_DATA);
  return userData ? JSON.parse(userData) : null;
};

// Update user data
export const updateUserData = (updates) => {
  const currentUser = getCurrentUser();
  if (currentUser) {
    const updatedUser = { ...currentUser, ...updates };
    localStorage.setItem(STORAGE_KEYS.USER_DATA, JSON.stringify(updatedUser));
    return updatedUser;
  }
  return null;
};

// Get user's JunCoin balance
export const getJunCoinBalance = () => {
  const user = getCurrentUser();
  return user ? (user.juncoin || 0) : 0;
};

// Add JunCoin to user's balance
export const addJunCoin = (amount, reason = '', taskId = null) => {
  const currentBalance = getJunCoinBalance();
  const newBalance = currentBalance + amount;
  
  const user = updateUserData({ juncoin: newBalance });
  
  // Record transaction
  recordTransaction({
    type: TRANSACTION_TYPES.BONUS,
    amount: amount,
    reason: reason,
    taskId: taskId,
    balanceAfter: newBalance,
    timestamp: new Date().toISOString()
  });
  
  return newBalance;
};

// Subtract JunCoin from user's balance
export const subtractJunCoin = (amount, reason = '', itemId = null) => {
  const currentBalance = getJunCoinBalance();
  
  if (currentBalance < amount) {
    throw new Error('Balansda yetarli JunCoin yo\'q');
  }
  
  const newBalance = currentBalance - amount;
  const user = updateUserData({ juncoin: newBalance });
  
  // Record transaction
  recordTransaction({
    type: TRANSACTION_TYPES.PURCHASE,
    amount: -amount,
    reason: reason,
    itemId: itemId,
    balanceAfter: newBalance,
    timestamp: new Date().toISOString()
  });
  
  return newBalance;
};

// Record a transaction
export const recordTransaction = (transaction) => {
  const transactions = getTransactionHistory();
  const newTransaction = {
    id: Date.now() + Math.random(),
    userId: getCurrentUser()?.email || 'unknown',
    ...transaction
  };
  
  transactions.unshift(newTransaction);
  
  // Keep only last 100 transactions
  if (transactions.length > 100) {
    transactions.splice(100);
  }
  
  localStorage.setItem(STORAGE_KEYS.TRANSACTIONS, JSON.stringify(transactions));
  return newTransaction;
};

// Get transaction history
export const getTransactionHistory = () => {
  const transactions = localStorage.getItem(STORAGE_KEYS.TRANSACTIONS);
  return transactions ? JSON.parse(transactions) : [];
};

// Complete a task and earn JunCoin
export const completeTask = (taskId, taskData) => {
  const { difficulty = 'medium', customReward = null } = taskData;
  const reward = customReward || TASK_REWARDS[difficulty] || TASK_REWARDS.medium;
  
  const newBalance = addJunCoin(reward, `Vazifa bajarildi: ${taskData.title}`, taskId);
  
  // Update task as completed
  const tasks = getTasks();
  const taskIndex = tasks.findIndex(t => t.id === taskId);
  if (taskIndex !== -1) {
    tasks[taskIndex] = {
      ...tasks[taskIndex],
      completed: true,
      completedAt: new Date().toISOString(),
      rewardEarned: reward
    };
    saveTasks(tasks);
  }
  
  return { newBalance, reward };
};

// Achieve a goal and earn bonus JunCoin
export const achieveGoal = (goalId, goalData) => {
  const { size = 'medium' } = goalData;
  const bonus = GOAL_BONUSES[size] || GOAL_BONUSES.medium;
  
  const newBalance = addJunCoin(bonus, `Maqsad erishildi: ${goalData.title}`, goalId);
  
  // Update goal as achieved
  const goals = getGoals();
  const goalIndex = goals.findIndex(g => g.id === goalId);
  if (goalIndex !== -1) {
    goals[goalIndex] = {
      ...goals[goalIndex],
      achieved: true,
      achievedAt: new Date().toISOString(),
      bonusEarned: bonus
    };
    saveGoals(goals);
  }
  
  return { newBalance, bonus };
};

// Make a purchase with JunCoin
export const makePurchase = (itemId, itemData) => {
  const { price, name } = itemData;
  
  try {
    const newBalance = subtractJunCoin(price, `Xarid: ${name}`, itemId);
    
    // Record purchase
    const purchases = getPurchases();
    const newPurchase = {
      id: Date.now() + Math.random(),
      itemId: itemId,
      itemName: name,
      price: price,
      purchasedAt: new Date().toISOString(),
      userId: getCurrentUser()?.email || 'unknown'
    };
    
    purchases.unshift(newPurchase);
    localStorage.setItem(STORAGE_KEYS.PURCHASES, JSON.stringify(purchases));
    
    return { newBalance, purchase: newPurchase };
  } catch (error) {
    throw error;
  }
};

// Get user's tasks
export const getTasks = () => {
  const tasks = localStorage.getItem(STORAGE_KEYS.TASKS);
  return tasks ? JSON.parse(tasks) : getDefaultTasks();
};

// Save tasks
export const saveTasks = (tasks) => {
  localStorage.setItem(STORAGE_KEYS.TASKS, JSON.stringify(tasks));
};

// Get user's goals
export const getGoals = () => {
  const goals = localStorage.getItem(STORAGE_KEYS.GOALS);
  return goals ? JSON.parse(goals) : getDefaultGoals();
};

// Save goals
export const saveGoals = (goals) => {
  localStorage.setItem(STORAGE_KEYS.GOALS, JSON.stringify(goals));
};

// Get user's purchases
export const getPurchases = () => {
  const purchases = localStorage.getItem(STORAGE_KEYS.PURCHASES);
  return purchases ? JSON.parse(purchases) : [];
};

// Get default tasks for new users
const getDefaultTasks = () => [
  {
    id: 1,
    title: 'Uy vazifasini bajarish',
    description: 'Bugungi uy vazifalarini to\'liq bajaring',
    difficulty: 'medium',
    reward: TASK_REWARDS.medium,
    category: 'Ta\'lim',
    completed: false,
    dueDate: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 2,
    title: 'Ota-onaga yordam berish',
    description: 'Uy ishlarida ota-onaga yordam bering',
    difficulty: 'easy',
    reward: TASK_REWARDS.easy,
    category: 'Yordam',
    completed: false,
    dueDate: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 3,
    title: 'Kitob o\'qish',
    description: '30 daqiqa kitob o\'qing',
    difficulty: 'easy',
    reward: TASK_REWARDS.easy,
    category: 'Ta\'lim',
    completed: false,
    dueDate: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()
  }
];

// Get default goals for new users
const getDefaultGoals = () => [
  {
    id: 1,
    title: 'Velosiped uchun jamg\'arma',
    description: 'Yangi velosiped sotib olish uchun jamg\'arma',
    targetAmount: 1000,
    currentAmount: 0,
    size: 'large',
    category: 'Sport',
    achieved: false,
    createdAt: new Date().toISOString()
  },
  {
    id: 2,
    title: 'LEGO to\'plami uchun jamg\'arma',
    description: 'Yangi LEGO konstruktor to\'plami uchun jamg\'arma',
    targetAmount: 500,
    currentAmount: 0,
    size: 'medium',
    category: 'O\'yinchoqlar',
    achieved: false,
    createdAt: new Date().toISOString()
  }
];

// Get JunCoin statistics
export const getJunCoinStats = () => {
  const transactions = getTransactionHistory();
  const user = getCurrentUser();
  
  const totalEarned = transactions
    .filter(t => t.amount > 0)
    .reduce((sum, t) => sum + t.amount, 0);
    
  const totalSpent = transactions
    .filter(t => t.amount < 0)
    .reduce((sum, t) => sum + Math.abs(t.amount), 0);
    
  const currentBalance = getJunCoinBalance();
  
  return {
    currentBalance,
    totalEarned,
    totalSpent,
    transactionCount: transactions.length,
    averageTransaction: transactions.length > 0 
      ? Math.round(totalEarned / transactions.filter(t => t.amount > 0).length) 
      : 0
  };
};

// Initialize JunCoin system for new users
export const initializeJunCoinSystem = (userRole = 'child') => {
  const startingBalance = userRole === 'child' ? 100 : 0;
  
  updateUserData({ juncoin: startingBalance });
  
  if (userRole === 'child') {
    // Add welcome bonus transaction
    recordTransaction({
      type: TRANSACTION_TYPES.BONUS,
      amount: startingBalance,
      reason: 'Xush kelibsiz bonusi',
      balanceAfter: startingBalance,
      timestamp: new Date().toISOString()
    });
  }
  
  return startingBalance;
};

// Transfer JunCoin between users (for parent-child transfers)
export const transferJunCoin = (fromUserId, toUserId, amount, reason = '') => {
  // This would be more complex in a real system with user management
  // For now, we'll just record the transaction
  recordTransaction({
    type: TRANSACTION_TYPES.TRANSFER,
    amount: -amount,
    reason: `Transfer: ${reason}`,
    targetUserId: toUserId,
    balanceAfter: getJunCoinBalance() - amount,
    timestamp: new Date().toISOString()
  });
  
  return subtractJunCoin(amount, `Transfer to ${toUserId}: ${reason}`);
};

export default {
  getCurrentUser,
  updateUserData,
  getJunCoinBalance,
  addJunCoin,
  subtractJunCoin,
  completeTask,
  achieveGoal,
  makePurchase,
  getTransactionHistory,
  getJunCoinStats,
  initializeJunCoinSystem,
  transferJunCoin,
  getTasks,
  getGoals,
  getPurchases,
  TASK_REWARDS,
  GOAL_BONUSES,
  TRANSACTION_TYPES
};