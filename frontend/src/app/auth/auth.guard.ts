import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from 'express';

import { AuthService } from './auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  return true;
};
