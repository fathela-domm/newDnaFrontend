import { TestBed } from '@angular/core/testing';

import { ClipboardCopyService } from './clipboard-copy.service';

describe('ClipboardCopyService', () => {
  let service: ClipboardCopyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClipboardCopyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
