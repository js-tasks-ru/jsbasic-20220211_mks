let calculator = {
  read(a, b) {
    this.val1 = a;
    this.val2 = b;
  },
  sum() {

    return this.val1 + this.val2;
  },
  mul() {

    return this.val1 * this.val2;
  }
};

// НЕ УДАЛЯТЬ СТРОКУ, НУЖНА ДЛЯ ПРОВЕРКИ
window.calculator = calculator; // делает ваш калькулятор доступным глобально
