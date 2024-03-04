import { Component } from '@angular/core';

enum PasswordRulesColors {
  gray,
  red,
  green,
  yellow
}

interface PasswordRulesStyle {
  background: string,
  color: string,
}

export function getPasswordRulesStyle(color: PasswordRulesColors): PasswordRulesStyle {
  switch (color) {
    case PasswordRulesColors.gray:
      return {background: 'gray', color: 'white'};
    case PasswordRulesColors.green:
      return {background: 'green', color: 'white'};
    case PasswordRulesColors.red:
      return {background: 'red', color: 'white'};
    case PasswordRulesColors.yellow:
      return {background: 'yellow', color: 'black'};
  }
}

interface IPasswordRules {
  style: PasswordRulesStyle;
  message: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  public passwordRules: IPasswordRules[] = [
    {
      style: getPasswordRulesStyle(PasswordRulesColors.gray), 
      message: 'Only letters/digits/symbols - the password is easy;'
    },
    {
      style: getPasswordRulesStyle(PasswordRulesColors.gray), 
      message: 'Combination of letters-symbols/letters-digits/digits-symbols - the password is medium;'
    },
    {
      style: getPasswordRulesStyle(PasswordRulesColors.gray), 
      message: 'Has letters, symbols and numbers - the password is strong;'
    },
  ]

  public password: string = '';

  public onPasswordChange(password: string) {
    this.password = password;

    // checking if the password is incorrect or empty
    if(password.length < 8) {
      return this.passwordRules.forEach((rule: IPasswordRules): void => {
        rule.style = password.length === 0 
          ? getPasswordRulesStyle(PasswordRulesColors.gray)
          : getPasswordRulesStyle(PasswordRulesColors.red);
      })
    }

    // variables to check password type
    const digitsCount: number = password.match(/[0-9]/g)?.length || 0;
    const lettersCount: number = password.toLowerCase().match(/[a-z]/g)?.length || 0;
    const symbolsCount: number = password.length - digitsCount - lettersCount;

    // checking if the password is strong
    if(digitsCount > 0 && lettersCount > 0 && symbolsCount > 0) {
      return this.passwordRules.forEach((rule: IPasswordRules): void => {
        rule.style = getPasswordRulesStyle(PasswordRulesColors.green);
      })
    }

    // checking if the password is easy
    if(
      digitsCount === password.length 
      || lettersCount === password.length 
      || symbolsCount === password.length
      ) {
        this.passwordRules[0].style = getPasswordRulesStyle(PasswordRulesColors.red)
        return this.passwordRules.slice(1).map((rule: IPasswordRules): void => {
          rule.style = getPasswordRulesStyle(PasswordRulesColors.gray);
        })
    }
    
    // checking if the password is medium
    this.passwordRules.slice(0, 2).map((rule: IPasswordRules): void => {
      rule.style = getPasswordRulesStyle(PasswordRulesColors.yellow);
    })
    this.passwordRules.slice(-1)[0].style = getPasswordRulesStyle(PasswordRulesColors.gray)
  }
}