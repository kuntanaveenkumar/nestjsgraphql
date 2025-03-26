import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Observable, from } from 'rxjs';
import { Guide } from './guides.entity';

import { CreateGuideInput } from './create-guide.input';
@Injectable()
export class GuidesService {
    constructor(
        @InjectRepository(Guide)
        private guideRepository: Repository<Guide>,
    ) { }
    findAll(): Observable<Guide[]> {
        return from(this.guideRepository.find());
    }
   /* findOneObservable(username: string): Observable<Guide | undefined | null> {
        return from(
            this.guideRepository.findOne({ where: { username } })
        );
    }
    create(createUserInput: CreateGuideInput): Observable<Guide> {
        const userEntity = this.guideRepository.create(createUserInput);
        return from(this.guideRepository.save(userEntity));
    }*/
}