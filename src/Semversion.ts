import semver, { SemVer, clean } from 'semver';

export class Semversion {
    private readonly _version: SemVer | null;

    constructor(ver: string | SemVer) {
        this._version = semver.parse(ver);
    }

    public get isValid(): boolean {
        return !!this._version;
    }

    public get raw(): string | undefined {
        return this._version?.raw;
    }

    public get version(): string | undefined {
        if(this.isValid){
            return clean(this._version!.version) ?? undefined;
        }
    }

    public get full(): string | undefined {
        let str = this.version ?? '';
        str += this.hasBuild ? `+${this.build}` : '';
        return str;
    }

    public get major(): number | undefined {
        return this._version?.major;
    }

    public get minor(): number | undefined {
        return this._version?.minor;
    }

    public get patch(): number | undefined {
        return this._version?.patch;
    }

    public get hasBuild(): boolean {
        return !!this._version?.build?.length;
    }

    public get build(): string | undefined {
        return this.hasBuild ? this._version?.build.join('.') : undefined;
    }

    public get buildValues(): readonly string[] | undefined {
        return this.hasBuild ? this._version?.build : undefined;
    }

    public get isPrerelease(): boolean {
        return !!this._version?.prerelease?.length;
    }

    public get prereleaseId(): string | undefined {
        return this.isPrerelease ? this._version?.prerelease[0].toString() : undefined;
    }

    public get prereleaseValues(): readonly (string | number)[] | undefined {
        return this.isPrerelease ? this._version?.prerelease : undefined;
    }

    public get prerelease(): string | undefined {
        return this.isPrerelease ? this._version!.prerelease.join('.') : undefined;
    }

    public toString() {
        return this.full ?? '[Invalid Semver]';
    }

    public toJSON(): object | null {
        if (this.isValid) {
            return {
                build: this.build,
                buildValues: this.buildValues,
                version: this.version,
                full: this.full,
                hasBuild: this.hasBuild,
                isPrerelease: this.isPrerelease,
                isValid: this.isValid,
                major: this.major,
                minor: this.minor,
                patch: this.patch,
                prerelease: this.prerelease,
                prereleaseId: this.prereleaseId,
                prereleaseValues: this.prereleaseValues,
                raw: this.raw
            };
        }
        return null;
    }

}